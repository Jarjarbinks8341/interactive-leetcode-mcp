/**
 * Per-problem session state — the durable record the pedagogy state machine
 * reads and writes.
 *
 * One file per problem slug under `~/.leetcode-mcp/sessions/<slug>.json`.
 * Persisted across restarts so the user can step away from a problem and
 * resume at the same hint level / attempt count later.
 */
export const MAX_HINT_LEVEL = 4;
//# sourceMappingURL=session.js.map
