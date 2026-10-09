/**
 * Structured error codes for the LeetCode MCP server.
 *
 * Tools and the service layer should throw `LeetCodeError` with one of these
 * codes instead of stringly-typed `Error`s, so the MCP layer can map them to
 * predictable, machine-readable error envelopes.
 */
export declare const ErrorCode: {
    /** Caller is not authenticated — credentials missing or invalid. */
    readonly AUTH_REQUIRED: "AUTH_REQUIRED";
    /** Stored credentials were rejected by LeetCode (expired / revoked). */
    readonly AUTH_INVALID: "AUTH_INVALID";
    /** Requested LeetCode problem slug doesn't exist. */
    readonly PROBLEM_NOT_FOUND: "PROBLEM_NOT_FOUND";
    /** Requested solution article doesn't exist. */
    readonly SOLUTION_NOT_FOUND: "SOLUTION_NOT_FOUND";
    /** Submission language isn't supported. */
    readonly LANGUAGE_UNSUPPORTED: "LANGUAGE_UNSUPPORTED";
    /** LeetCode rejected the request as rate-limited. */
    readonly RATE_LIMITED: "RATE_LIMITED";
    /** Submission polling timed out before LeetCode produced a verdict. */
    readonly SUBMISSION_TIMEOUT: "SUBMISSION_TIMEOUT";
    /** Network failure talking to LeetCode (DNS, connection refused, etc). */
    readonly NETWORK_ERROR: "NETWORK_ERROR";
    /** LeetCode returned a payload that didn't match the expected schema. */
    readonly UPSTREAM_PAYLOAD_INVALID: "UPSTREAM_PAYLOAD_INVALID";
    /** Catch-all for unexpected upstream errors. */
    readonly UPSTREAM_ERROR: "UPSTREAM_ERROR";
    /**
     * Tutoring gate: the caller asked for content (typically a full
     * solution) that is gated behind a higher hint level than the active
     * session has reached. The pedagogy state machine refuses; the agent
     * is expected to drive the user through `request_hint` first.
     */
    readonly HINT_LEVEL_TOO_LOW: "HINT_LEVEL_TOO_LOW";
    /**
     * Tutoring gate: the operation requires an active session for a
     * particular problem slug, but no `start_problem` has been called for
     * it (or the session was reset).
     */
    readonly SESSION_NOT_FOUND: "SESSION_NOT_FOUND";
    /**
     * `run_local_tests` was asked for a language the local runner has no
     * harness for. `submit_solution` keeps working for these languages —
     * the runner is purely additive.
     */
    readonly RUNNER_NOT_IMPLEMENTED_FOR_LANGUAGE: "RUNNER_NOT_IMPLEMENTED_FOR_LANGUAGE";
    /**
     * The language is supported in principle but the required runtime
     * binary (e.g. `python3`, `go`, `java`) was not found on PATH. The
     * `doctor` subcommand reports which runtimes are detected.
     */
    readonly LANGUAGE_RUNTIME_NOT_FOUND: "LANGUAGE_RUNTIME_NOT_FOUND";
    /**
     * The user's code exceeded the per-run wall-clock budget. The runner
     * killed the process; partial output (if any) is included in the
     * result envelope.
     */
    readonly RUNNER_TIMEOUT: "RUNNER_TIMEOUT";
    /**
     * `LEETCODE_MCP_REQUIRE_SANDBOX=1` is set but no OS sandbox tool was
     * found on this host. The runner refuses to fall back to the unsandboxed
     * subprocess path.
     */
    readonly SANDBOX_REQUIRED: "SANDBOX_REQUIRED";
    /**
     * Strict mode is enabled (`LEETCODE_MCP_STRICT_MODE=1`) and
     * `submit_solution` was called before `run_local_tests` last passed.
     * Drives the recommended local-first practice loop.
     */
    readonly LOCAL_TESTS_NOT_PASSED: "LOCAL_TESTS_NOT_PASSED";
};
export type ErrorCodeValue = (typeof ErrorCode)[keyof typeof ErrorCode];
/**
 * Error thrown by the service layer with a structured, machine-readable code.
 *
 * Catchers can dispatch on `error.code` to render appropriate user-facing
 * messages without parsing free-form `error.message` strings.
 */
export declare class LeetCodeError extends Error {
    readonly code: ErrorCodeValue;
    constructor(code: ErrorCodeValue, message: string, cause?: unknown);
}
/** Type-narrowing helper for `instanceof LeetCodeError` checks. */
export declare function isLeetCodeError(value: unknown): value is LeetCodeError;
