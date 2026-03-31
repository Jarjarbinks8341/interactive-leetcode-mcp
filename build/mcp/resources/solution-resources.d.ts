import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { RegistryBase } from "../../common/registry-base.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
/**
 * Solution resource registry class that handles registration of LeetCode solution-related resources.
 * This class manages resources for accessing solutions and solution details.
 */
export declare class SolutionResourceRegistry extends RegistryBase {
    protected registerPublic(): void;
}
/**
 * Registers all solution-related resources with the MCP server.
 *
 * @param server - The MCP server instance to register resources with
 * @param leetcodeService - The LeetCode service implementation to use for API calls
 */
export declare function registerSolutionResources(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface
): void;
