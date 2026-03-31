import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
import { ToolRegistry } from "./tool-registry.js";
/**
 * Onboarding tool registry. Provides a get_started tool that returns
 * usage guidance via its response — prompt invocation rules, session
 * flow, learning mode rules, auth flow, and language map.
 */
export declare class OnboardingToolRegistry extends ToolRegistry {
    protected registerPublic(): void;
}
export declare function registerOnboardingTools(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface
): void;
