import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SessionService } from "../../domain/session-service.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
import { ToolRegistry } from "./tool-registry.js";
/**
 * Pedagogy-flow tools: session lifecycle + hint progression.
 *
 * These four tools replace the prompt-based "remember to invoke X" flow
 * with explicit, server-tracked state. The agent calls `start_problem`
 * once, then drives `request_hint` until the user has engaged with each
 * level, and only then are the solution-returning tools callable.
 */
export declare class SessionToolRegistry extends ToolRegistry {
    private readonly sessions;
    constructor(
        server: McpServer,
        leetcodeService: LeetcodeServiceInterface,
        sessions: SessionService
    );
    protected registerPublic(): void;
    private registerStartProblem;
    private registerRequestHint;
    private registerGetSessionState;
    private registerResetSession;
}
/**
 * Renders a `LeetCodeError` (or any unknown failure) into the MCP
 * tool-result envelope shape, with the structured `code` field surfaced
 * alongside the human-readable message so clients can dispatch on it.
 *
 * Returns the MCP SDK tool-result shape; widened from the literal
 * single-content-item type so handler signatures unify with the SDK's
 * inferred return type.
 */
declare function errorEnvelope(
    fallbackMessage: string,
    error: unknown
): {
    content: {
        type: "text";
        text: string;
    }[];
};
export { errorEnvelope };
export declare function registerSessionTools(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface,
    sessions: SessionService
): void;
