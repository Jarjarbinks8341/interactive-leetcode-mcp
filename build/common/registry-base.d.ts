import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { LeetcodeServiceInterface } from "../leetcode/leetcode-service-interface.js";
/**
 * Abstract base registry class for LeetCode components that provides site type detection and authentication status checks.
 * This class defines the framework for registering different categories of components based on
 * authentication requirements.
 */
export declare abstract class RegistryBase {
    protected server: McpServer;
    protected leetcodeService: LeetcodeServiceInterface;
    /**
     * Creates a new registry instance.
     *
     * @param server - The MCP server instance to register components with
     * @param leetcodeService - The LeetCode service implementation to use for API calls
     */
    constructor(server: McpServer, leetcodeService: LeetcodeServiceInterface);
    /**
     * Registers all public components.
     */
    register(): void;
    /**
     * Hook for registering components. Override in subclasses.
     */
    protected registerPublic(): void;
}
