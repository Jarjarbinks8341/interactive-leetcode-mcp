import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { SessionService } from "../../domain/session-service.js";
import { LeetcodeServiceInterface } from "../../leetcode/leetcode-service-interface.js";
import { ToolRegistry } from "./tool-registry.js";
/**
 * Solution tool registry — community-solution access.
 *
 * Both tools are gated by the pedagogy state machine: they reject with
 * `HINT_LEVEL_TOO_LOW` until the active session for the slug has reached
 * the maximum hint level. The agent is expected to drive the user
 * through `request_hint` first.
 */
export declare class SolutionToolRegistry extends ToolRegistry {
    private readonly sessions;
    constructor(
        server: McpServer,
        leetcodeService: LeetcodeServiceInterface,
        sessions: SessionService
    );
    private assertTopicBelongsToSlug;
    protected registerPublic(): void;
}
export declare function registerSolutionTools(
    server: McpServer,
    leetcodeService: LeetcodeServiceInterface,
    sessions: SessionService
): void;
