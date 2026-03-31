import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { RegistryBase } from "../../common/registry-base.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
/**
 * Registry for LeetCode learning mode prompts
 * Provides prompts that guide AI agent behavior for workspace setup and learning mode
 */
export declare class LearningPromptRegistry extends RegistryBase {
    protected registerPublic(): void;
    /**
     * Maps programming language to file extension
     */
    private getFileExtension;
}
/**
 * Registers learning mode prompts with the MCP server
 */
export declare function registerLearningPrompts(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface
): void;
