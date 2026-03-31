import { RegistryBase } from "../../common/registry-base.js";
/**
 * Base registry class for LeetCode tools that provides site type detection and authentication status checks.
 * This abstract class defines the framework for registering different categories of tools
 */
export class ToolRegistry extends RegistryBase {
    server;
    leetcodeService;
    /**
     * Creates a new tool registry instance.
     *
     * @param server - The MCP server instance to register tools with
     * @param leetcodeService - The LeetCode service implementation to use for API calls
     */
    constructor(server, leetcodeService) {
        super(server, leetcodeService);
        this.server = server;
        this.leetcodeService = leetcodeService;
    }
}
//# sourceMappingURL=tool-registry.js.map
