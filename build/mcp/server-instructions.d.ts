/**
 * The MCP `instructions` field — a single block delivered to clients at
 * handshake. Replaces the SKILL-style "remember to invoke prompt X first"
 * dance with rules the agent receives once and keeps for the session.
 *
 * Kept as a small constant so it can be unit-tested independently and
 * is easy to evolve as the rest of the redesign lands.
 */
export declare const SERVER_INSTRUCTIONS: string;
