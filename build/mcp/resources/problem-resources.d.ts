import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { RegistryBase } from "../../common/registry-base.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
/**
 * Problem resource registry class that handles registration of LeetCode problem-related resources.
 * This class manages resources for accessing problem details, categories, tags, and supported languages.
 */
export declare class ProblemResourceRegistry extends RegistryBase {
    protected registerPublic(): void;
}
/**
 * Registers all problem-related resources with the MCP server.
 *
 * @param server - The MCP server instance to register resources with
 * @param leetcodeService - The LeetCode service implementation to use for API calls
 */
export declare function registerProblemResources(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface
): void;
