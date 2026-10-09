/**
 * Plain-subprocess `LocalRunner` implementation.
 *
 * Per-language registry (currently `python3`, `go`, and `java`) describes how to:
 *   - probe whether the runtime is available on PATH
 *   - spawn the runtime against a source file written to the run's
 *     temp dir
 *
 * Probes run lazily on the first `run()` for the language and the
 * results are cached for the lifetime of the process.
 *
 * Safety nets every run gets, even with no OS sandbox:
 *   - per-process wall-clock timeout (language-specific default;
 *     configurable per `RunInput`)
 *   - clean env (PATH / HOME / LANG plus language-specific cache dirs —
 *     secrets in the user's shell never leak in)
 *   - cwd is a freshly-mkdtemp'd directory under the OS tmp; it is
 *     removed after the run regardless of outcome
 *   - stdout/stderr captured with a 1 MB ceiling; runaway output gets
 *     truncated with a marker rather than blowing memory
 */
import { execFile as execFileCb, spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { performance } from "node:perf_hooks";
import { promisify } from "node:util";
import { ErrorCode, LeetCodeError } from "../types/index.js";
import logger from "../utils/logger.js";
import { IMPLEMENTED_LANGUAGES, SUPPORTED_LANGUAGES } from "./runner.js";
import { wrapWithSandbox } from "./sandbox.js";
// `execFile` (no shell) — never `promisify(exec)`, which routes through
// `/bin/sh -c` and is a shell-expansion foot-gun if anyone interpolates
// a dynamic value into a probe in the future.
const execFile = promisify(execFileCb);
const MAX_OUTPUT_BYTES = 1_000_000; // 1 MB per stream
const DEFAULT_TIMEOUT_MS = 5_000;
const GO_DEFAULT_TIMEOUT_MS = 20_000;
const JAVA_DEFAULT_TIMEOUT_MS = 20_000;
const TRUNCATION_MARKER = "\n[...output truncated at 1 MB...]";
let goRuntimePathsPromise;
async function getGoRuntimePaths() {
    if (!goRuntimePathsPromise) {
        const attempt = (async () => {
            const root = await mkdtemp(join(tmpdir(), "leetcode-mcp-go-"));
            const buildCache = join(root, "go-build");
            const moduleCache = join(root, "gomod");
            await mkdir(buildCache, { recursive: true });
            await mkdir(moduleCache, { recursive: true });
            return { root, buildCache, moduleCache };
        })();
        goRuntimePathsPromise = attempt.catch((error) => {
            goRuntimePathsPromise = undefined;
            throw error;
        });
    }
    return goRuntimePathsPromise;
}
async function prepareGoRuntime() {
    const paths = await getGoRuntimePaths();
    return {
        env: {
            GOCACHE: paths.buildCache,
            GOMODCACHE: paths.moduleCache
        },
        writablePaths: [paths.root]
    };
}
const LANGUAGES = {
    python3: {
        extension: "py",
        probe: { cmd: "python3", args: ["--version"] },
        buildArgs: (sourcePath) => ({
            cmd: "python3",
            args: [sourcePath]
        })
    },
    go: {
        extension: "go",
        probe: { cmd: "go", args: ["version"] },
        defaultTimeoutMs: GO_DEFAULT_TIMEOUT_MS,
        prepareRuntime: prepareGoRuntime,
        buildArgs: (sourcePath) => ({
            cmd: "go",
            args: ["run", sourcePath]
        })
    },
    java: {
        extension: "java",
        probe: { cmd: "java", args: ["-version"] },
        sourceFileName: "Solution.java",
        defaultTimeoutMs: JAVA_DEFAULT_TIMEOUT_MS,
        buildArgs: (sourcePath) => ({
            cmd: "java",
            args: [sourcePath]
        })
    }
};
const probeCache = new Map();
async function probeLanguage(language) {
    const cached = probeCache.get(language);
    if (cached) {
        return cached;
    }
    const spec = LANGUAGES[language];
    try {
        const { stdout, stderr } = await execFile(
            spec.probe.cmd,
            spec.probe.args,
            { timeout: 2000 }
        );
        // `python3 --version` and `go version` write to stdout; `java
        // -version` historically writes to stderr — accept either.
        const versionLine = (stdout || stderr || "").split("\n")[0]?.trim();
        const result = {
            available: true,
            version: versionLine || undefined
        };
        try {
            const { stdout: which } = await execFile(
                "which",
                [spec.probe.cmd],
                { timeout: 1000 }
            );
            result.path = which.trim() || undefined;
        } catch {
            /* `which` may not exist (Windows); leave `path` undefined */
        }
        probeCache.set(language, result);
        return result;
    } catch (error) {
        const result = { available: false };
        probeCache.set(language, result);
        logger.debug(
            { language, error: error?.message },
            "Language probe failed"
        );
        return result;
    }
}
/** Test helper — clears the probe cache so unit tests can re-detect. */
export function __resetProbeCacheForTest() {
    probeCache.clear();
}
function clampOutput(buf) {
    if (buf.length <= MAX_OUTPUT_BYTES) {
        return buf.toString("utf-8");
    }
    return (
        buf.subarray(0, MAX_OUTPUT_BYTES).toString("utf-8") + TRUNCATION_MARKER
    );
}
function killProcessTree(child, signal) {
    if (child.pid === undefined) {
        return;
    }
    if (process.platform === "win32") {
        child.kill(signal);
        return;
    }
    try {
        process.kill(-child.pid, signal);
    } catch (error) {
        if (error.code !== "ESRCH") {
            child.kill(signal);
        }
    }
}
export class SubprocessRunner {
    async capabilities() {
        const languages = await Promise.all(
            SUPPORTED_LANGUAGES.map(async (language) => {
                const probe = await probeLanguage(language);
                return {
                    language,
                    available: probe.available,
                    version: probe.version,
                    path: probe.path
                };
            })
        );
        // Sandbox detection is in `./sandbox.ts`; importing inline here
        // avoids a dependency cycle with `subprocess-runner` ↔ `sandbox`.
        const { detectSandbox } = await import("./sandbox.js");
        const detected = await detectSandbox();
        return {
            languages,
            sandbox: {
                kind: detected.kind,
                available: detected.kind !== "none"
            }
        };
    }
    async run(input) {
        if (!IMPLEMENTED_LANGUAGES.includes(input.language)) {
            throw new LeetCodeError(
                ErrorCode.RUNNER_NOT_IMPLEMENTED_FOR_LANGUAGE,
                `Local runner has no harness for ${input.language} yet`
            );
        }
        const probe = await probeLanguage(input.language);
        if (!probe.available) {
            throw new LeetCodeError(
                ErrorCode.LANGUAGE_RUNTIME_NOT_FOUND,
                `Required runtime for ${input.language} not found on PATH`
            );
        }
        const spec = LANGUAGES[input.language];
        const timeoutMs =
            input.timeoutMs ?? spec.defaultTimeoutMs ?? DEFAULT_TIMEOUT_MS;
        const runtimeLayout = (await spec.prepareRuntime?.()) ?? {
            env: {},
            writablePaths: []
        };
        const workDir = await mkdtemp(join(tmpdir(), "leetcode-mcp-run-"));
        const sourcePath = join(
            workDir,
            spec.sourceFileName ?? `solution.${spec.extension}`
        );
        try {
            await writeFile(sourcePath, input.code, "utf-8");
            const baseArgs = spec.buildArgs(sourcePath);
            const wrapped = await wrapWithSandbox(
                baseArgs.cmd,
                baseArgs.args,
                workDir,
                runtimeLayout.writablePaths
            );
            return await this.spawnAndCapture({
                cmd: wrapped.cmd,
                args: wrapped.args,
                cwd: workDir,
                timeoutMs,
                sandbox: wrapped.kind,
                env: runtimeLayout.env
            });
        } finally {
            await rm(workDir, { recursive: true, force: true }).catch(
                (error) => {
                    logger.debug(
                        { error: error?.message, workDir },
                        "Failed to clean up runner workdir"
                    );
                }
            );
        }
    }
    spawnAndCapture(options) {
        return new Promise((resolve) => {
            const start = performance.now();
            const child = spawn(options.cmd, options.args, {
                cwd: options.cwd,
                env: {
                    PATH: process.env.PATH ?? "",
                    HOME: options.cwd,
                    LANG: process.env.LANG ?? "C.UTF-8",
                    ...options.env
                },
                detached: process.platform !== "win32",
                stdio: ["ignore", "pipe", "pipe"]
            });
            const stdout = [];
            const stderr = [];
            let stdoutBytes = 0;
            let stderrBytes = 0;
            let timedOut = false;
            let killTimer;
            // Tight guard: never let the buffered total exceed
            // `MAX_OUTPUT_BYTES` even by a chunk. We slice the
            // overflowing chunk to the exact remaining headroom and
            // drop the rest. `clampOutput` still runs at finalize as a
            // belt-and-braces final cap.
            const captureChunk = (buffers, bytes, chunk) => {
                const remaining = MAX_OUTPUT_BYTES - bytes;
                if (remaining <= 0) {
                    return bytes;
                }
                if (chunk.length <= remaining) {
                    buffers.push(chunk);
                    return bytes + chunk.length;
                }
                buffers.push(chunk.subarray(0, remaining));
                return bytes + remaining;
            };
            child.stdout?.on("data", (chunk) => {
                stdoutBytes = captureChunk(stdout, stdoutBytes, chunk);
            });
            child.stderr?.on("data", (chunk) => {
                stderrBytes = captureChunk(stderr, stderrBytes, chunk);
            });
            const timer = setTimeout(() => {
                timedOut = true;
                // SIGTERM first; if the child ignores it, hard SIGKILL
                // 500 ms later. Belt + braces for runaway loops.
                killProcessTree(child, "SIGTERM");
                killTimer = setTimeout(
                    () => killProcessTree(child, "SIGKILL"),
                    500
                );
            }, options.timeoutMs);
            let settled = false;
            const finalize = (exitCode, runnerError) => {
                if (settled) {
                    return;
                }
                settled = true;
                clearTimeout(timer);
                if (killTimer) {
                    clearTimeout(killTimer);
                }
                const durationMs = Math.round(performance.now() - start);
                const passed = !timedOut && !runnerError && exitCode === 0;
                const stderrText =
                    clampOutput(Buffer.concat(stderr)) +
                    (runnerError
                        ? `\n[runner error: ${runnerError.message}]`
                        : "");
                resolve({
                    passed,
                    exitCode,
                    stdout: clampOutput(Buffer.concat(stdout)),
                    stderr: stderrText,
                    timedOut: runnerError ? false : timedOut,
                    durationMs,
                    sandbox: options.sandbox,
                    warning:
                        !runnerError && options.sandbox === "none"
                            ? "No OS sandbox available on this host; ran without isolation."
                            : undefined
                });
            };
            child.on("close", (code, signal) => {
                if (signal && code === null) {
                    finalize(null);
                } else {
                    finalize(code);
                }
            });
            child.on("error", (error) => {
                logger.warn(
                    { error: error.message, cmd: options.cmd },
                    "Runner subprocess errored before exit"
                );
                finalize(null, error);
            });
        });
    }
}
//# sourceMappingURL=subprocess-runner.js.map
