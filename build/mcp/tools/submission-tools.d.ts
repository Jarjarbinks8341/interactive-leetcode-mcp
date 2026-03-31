import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
import { ToolRegistry } from "./tool-registry.js";
/**
 * Submission tool registry class that handles registration of LeetCode submission tools.
 */
export declare class SubmissionToolRegistry extends ToolRegistry {
    protected registerPublic(): void;
}
/**
 * Registers all submission-related tools with the MCP server.
 *
 * @param server - The MCP server instance to register tools with
 * @param leetcodeService - The LeetCode service implementation to use for API calls
 */
export declare function registerSubmissionTools(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface
): void;
