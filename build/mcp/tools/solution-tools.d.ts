import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
import { ToolRegistry } from "./tool-registry.js";
/**
 * Solution tool registry class that handles registration of LeetCode solution-related tools.
 * This class manages tools for accessing solutions, filtering solutions, and reading solution details.
 */
export declare class SolutionToolRegistry extends ToolRegistry {
    protected registerPublic(): void;
}
/**
 * Registers all solution-related tools with the MCP server.
 *
 * @param server - The MCP server instance to register tools with
 * @param leetcodeService - The LeetCode service implementation to use for API calls
 */
export declare function registerSolutionTools(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface
): void;
