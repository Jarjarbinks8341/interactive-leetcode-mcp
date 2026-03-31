import { z } from "zod";
import { ToolRegistry } from "./tool-registry.js";
export class NoteToolRegistry extends ToolRegistry {
    registerPublic() {
        this.server.registerTool(
            "get_note",
            {
                description:
                    "Retrieves the user's note for a specific LeetCode problem by its title slug (requires authentication)",
                inputSchema: {
                    titleSlug: z
                        .string()
                        .describe(
                            "The problem slug as it appears in the LeetCode URL (e.g., 'two-sum', 'merge-sorted-array')"
                        )
                }
            },
            async ({ titleSlug }) => {
                try {
                    const data =
                        await this.leetcodeService.fetchNoteByTitleSlug(
                            titleSlug
                        );
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    titleSlug,
                                    questionId: data.questionId,
                                    note: data.note
                                })
                            }
                        ]
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    error: "Failed to get note",
                                    message: error.message
                                })
                            }
                        ]
                    };
                }
            }
        );
        this.server.registerTool(
            "update_note",
            {
                description:
                    "Creates or updates the user's note for a specific LeetCode problem. Supports markdown content. (requires authentication)",
                inputSchema: {
                    titleSlug: z
                        .string()
                        .describe(
                            "The problem slug as it appears in the LeetCode URL (e.g., 'two-sum', 'merge-sorted-array')"
                        ),
                    content: z
                        .string()
                        .describe(
                            "The note content to save (supports markdown format)"
                        )
                }
            },
            async ({ titleSlug, content }) => {
                try {
                    const data =
                        await this.leetcodeService.updateNoteByTitleSlug(
                            titleSlug,
                            content
                        );
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    titleSlug,
                                    success: data.ok,
                                    error: data.error || undefined
                                })
                            }
                        ]
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    error: "Failed to update note",
                                    message: error.message
                                })
                            }
                        ]
                    };
                }
            }
        );
        this.server.registerTool(
            "delete_note",
            {
                description:
                    "Deletes the user's note for a specific LeetCode problem (requires authentication)",
                inputSchema: {
                    titleSlug: z
                        .string()
                        .describe(
                            "The problem slug as it appears in the LeetCode URL (e.g., 'two-sum', 'merge-sorted-array')"
                        )
                }
            },
            async ({ titleSlug }) => {
                try {
                    const data =
                        await this.leetcodeService.deleteNoteByTitleSlug(
                            titleSlug
                        );
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    titleSlug,
                                    success: data.ok,
                                    error: data.error || undefined
                                })
                            }
                        ]
                    };
                } catch (error) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({
                                    error: "Failed to delete note",
                                    message: error.message
                                })
                            }
                        ]
                    };
                }
            }
        );
    }
}
export function registerNoteTools(server, leetcodeService) {
    const registry = new NoteToolRegistry(server, leetcodeService);
    registry.register();
}
//# sourceMappingURL=note-tools.js.map
