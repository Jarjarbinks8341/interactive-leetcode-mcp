import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SessionService } from "../../domain/session-service.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
import { type LocalRunner } from "../../runner/runner.js";
import { ToolRegistry } from "./tool-registry.js";
/**
 * Local-runner tools introduced in Phase 4.
 *
 * `run_local_tests` is the inner-loop primitive: agent passes code,
 * runner spawns a sandboxed subprocess, captures stdout/stderr/exit
 * code, and reports back. The session's `lastLocalRunPassed` flag is
 * updated as a side effect so `submit_solution`'s strict-mode gate
 * (Phase 6) and any future analytics have a stable hook.
 *
 * v1 deliberately does *not* parse `exampleTestcases` server-side or
 * synthesize a per-problem harness. The agent — which already has the
 * problem in context after `start_problem` — is responsible for adding
 * test invocations to the code it submits to the runner. That keeps
 * the wire surface tiny, language-agnostic, and free of LeetCode-
 * specific signature parsing.
 */
export declare class RunnerToolRegistry extends ToolRegistry {
    private readonly sessions;
    private readonly runner;
    constructor(
        server: McpServer,
        leetcodeService: LeetcodeServiceInterface,
        sessions: SessionService,
        runner: LocalRunner
    );
    protected registerPublic(): void;
    private registerRunLocalTests;
    private registerDoctor;
}
export declare function registerRunnerTools(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface,
    sessions: SessionService,
    runner: LocalRunner
): void;
