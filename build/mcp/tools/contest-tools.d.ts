import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
import { ToolRegistry } from "./tool-registry.js";
/**
 * Contest tool registry class that handles registration of LeetCode contest-related tools.
 * This class manages tools for accessing contest rankings, history, and user performance in contests.
 */
export declare class ContestToolRegistry extends ToolRegistry {
    protected registerPublic(): void;
}
/**
 * Registers all contest-related tools with the MCP server.
 *
 * @param server - The MCP server instance to register tools with
 * @param leetcodeService - The LeetCode service implementation to use for API calls
 */
export declare function registerContestTools(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface
): void;
