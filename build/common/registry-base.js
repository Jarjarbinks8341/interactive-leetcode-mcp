/**
 * Abstract base registry class for LeetCode components that provides site type detection and authentication status checks.
 * This class defines the framework for registering different categories of components based on
 * authentication requirements.
 */
export class RegistryBase {
    server;
    leetcodeService;
    /**
     * Creates a new registry instance.
     *
     * @param server - The MCP server instance to register components with
     * @param leetcodeService - The LeetCode service implementation to use for API calls
     */
    constructor(server, leetcodeService) {
        this.server = server;
        this.leetcodeService = leetcodeService;
    }
    /**
     * Registers all public components.
     */
    register() {
        this.registerPublic();
    }
    /**
     * Hook for registering components. Override in subclasses.
     */
    registerPublic() {}
}
//# sourceMappingURL=registry-base.js.map
