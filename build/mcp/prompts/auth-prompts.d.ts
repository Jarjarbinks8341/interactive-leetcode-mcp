import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { RegistryBase } from "../../common/registry-base.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
/**
 * Registry for LeetCode authentication prompts
 * Provides prompts that guide AI agents through the authentication process
 */
export declare class AuthPromptRegistry extends RegistryBase {
    protected registerPublic(): void;
}
/**
 * Registers all authentication-related prompts
 */
export declare function registerAuthPrompts(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface
): void;
