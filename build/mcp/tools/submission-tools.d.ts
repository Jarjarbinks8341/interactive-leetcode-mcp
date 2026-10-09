import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SessionService } from "../../domain/session-service.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
import { ToolRegistry } from "./tool-registry.js";
/**
 * Submission tool registry class that handles registration of LeetCode submission tools.
 *
 * Phase 4 wires the strict-mode gate (`LEETCODE_MCP_STRICT_MODE=1`):
 * when enabled, `submit_solution` refuses to spend a real LeetCode
 * submission unless the active session's `lastLocalRunPassed === true`.
 * Default is *off* (preserves current behaviour); session is optional
 * so existing flows without `start_problem` aren't broken.
 */
export declare class SubmissionToolRegistry extends ToolRegistry {
    private readonly sessions?;
    constructor(
        server: McpServer,
        leetcodeService: LeetcodeServiceInterface,
        sessions?: SessionService | undefined
    );
    private isStrictMode;
    protected registerPublic(): void;
}
/**
 * Registers all submission-related tools with the MCP server.
 *
 * @param server - The MCP server instance to register tools with
 * @param leetcodeService - The LeetCode service implementation to use for API calls
 * @param sessions - Optional session service used for the strict-mode gate
 */
export declare function registerSubmissionTools(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface,
    sessions?: SessionService
): void;
