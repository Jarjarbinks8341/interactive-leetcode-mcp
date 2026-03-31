import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
import { ToolRegistry } from "./tool-registry.js";
/**
 * User tool registry class that handles registration of LeetCode user-related tools.
 * This class manages tools for accessing user profiles, submissions, and progress data.
 */
export declare class UserToolRegistry extends ToolRegistry {
    protected registerPublic(): void;
}
/**
 * Registers all user-related tools with the MCP server.
 *
 * @param server - The MCP server instance to register tools with
 * @param leetcodeService - The LeetCode service implementation to use for API calls
 */
export declare function registerUserTools(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface
): void;
