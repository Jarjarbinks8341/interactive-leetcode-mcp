import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { RegistryBase } from "../../common/registry-base.js";
/**
 * Solution resource registry class that handles registration of LeetCode solution-related resources.
 * This class manages resources for accessing solutions and solution details.
 */
export class SolutionResourceRegistry extends RegistryBase {
    registerPublic() {
        // Global solution resource
        this.server.registerResource(
            "problem-solution",
            new ResourceTemplate("solution://{topicId}", {
                list: undefined
            }),
            {
                description:
                    "Provides the complete content and metadata of a specific problem solution, including the full article text, author information, and related navigation links. The topicId parameter in the URI identifies the specific solution. This ID can be obtained from the 'topicId' field in the response of the 'list_problem_solutions' tool.",
                mimeType: "application/json"
            },
            async (uri, variables) => {
                const topicId = variables.topicId;
                try {
                    const solutionDetail =
                        await this.leetcodeService.fetchSolutionArticleDetail(
                            topicId
                        );
                    return {
                        contents: [
                            {
                                uri: uri.toString(),
                                text: JSON.stringify({
                                    topicId,
                                    solution: solutionDetail
                                }),
                                mimeType: "application/json"
                            }
                        ]
                    };
                } catch (error) {
                    return {
                        contents: [
                            {
                                uri: uri.toString(),
                                text: JSON.stringify({
                                    error: "Failed to fetch solution",
                                    message: error.message
                                }),
                                mimeType: "application/json"
                            }
                        ]
                    };
                }
            }
        );
    }
}
/**
 * Registers all solution-related resources with the MCP server.
 *
 * @param server - The MCP server instance to register resources with
 * @param leetcodeService - The LeetCode service implementation to use for API calls
 */
export function registerSolutionResources(server, leetcodeService) {
    const registry = new SolutionResourceRegistry(server, leetcodeService);
    registry.register();
}
//# sourceMappingURL=solution-resources.js.map
