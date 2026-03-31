import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
import { ToolRegistry } from "./tool-registry.js";
/**
 * Auth tool registry class that handles registration of LeetCode authentication tools.
 * Uses AI-guided manual credential entry for maximum reliability and cross-platform compatibility.
 */
export declare class AuthToolRegistry extends ToolRegistry {
    /**
     * Attempts to open browser, returns success status
     */
    private tryOpenBrowser;
    protected registerPublic(): void;
}
export declare function registerAuthTools(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface
): void;
