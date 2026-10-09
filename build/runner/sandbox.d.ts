import type { SandboxKind } from "../types/index.js";
interface DetectedSandbox {
    kind: SandboxKind;
    /** When `kind === "none"`, the absolute path to the wrapping
     *  binary (`bwrap`, `firejail`, `sandbox-exec`) is undefined. */
    path?: string;
}
/**
 * Probe the host once per server lifetime. Subsequent calls return the
 * cached result; tests can use `__resetSandboxCacheForTest` to force
 * re-detection.
 */
export declare function detectSandbox(): Promise<DetectedSandbox>;
/**
 * Wrap an existing command with the detected sandbox. Returns the new
 * `[cmd, args]` pair plus the kind that was applied. When no sandbox is
 * available, returns the input pair untouched and `kind: "none"`.
 *
 * `cwdAllowed` is the temp directory the user code is permitted to read
 * + write — the rest of the filesystem is read-only (Linux) or denied
 * (macOS).
 */
export declare function wrapWithSandbox(
    cmd: string,
    args: string[],
    cwdAllowed: string,
    writablePaths?: string[]
): Promise<{
    cmd: string;
    args: string[];
    kind: SandboxKind;
}>;
/** Test helper — clears the per-process cache so unit tests can re-probe. */
export declare function __resetSandboxCacheForTest(): void;
/** Test helper — seeds the per-process sandbox cache. */
export declare function __setSandboxCacheForTest(next: {
    kind: SandboxKind;
    path?: string;
}): void;
export {};
