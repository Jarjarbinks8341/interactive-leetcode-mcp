/**
 * Pure-logic hint state machine.
 *
 * The "tutor, not solution oracle" contract is enforced **here** — not in
 * prompts, not in tool descriptions, not in the agent's instruction-following.
 * Every transition that affects hint progression flows through these
 * functions, and gated tools call {@link assertSolutionUnlocked} before
 * returning content. If a code path bypasses this module it is a bug.
 *
 * Intentionally has no IO: takes a {@link SessionState}, returns a new one
 * (or throws). The session store handles persistence.
 */
import { type HintLevel, type SessionState } from "../types/index.js";
/** Hint level at which the canonical solution becomes callable. */
export declare const SOLUTION_HINT_LEVEL: HintLevel;
/**
 * Bumps `session.hintLevel` by one (clamped at {@link MAX_HINT_LEVEL}) and
 * stamps `updatedAt`. Returns a new object — the input is not mutated.
 *
 * Bumping at the maximum level is a no-op rather than an error: callers
 * that want a different behaviour should check `session.hintLevel` before
 * calling.
 */
export declare function advanceHint(session: SessionState): SessionState;
/**
 * Resets the session back to its level-0 initial state, preserving the
 * slug / language / workspace so the user can re-attempt from scratch.
 *
 * `attempts` and `lastLocalRunPassed` are zeroed too, because resetting
 * the hint level without resetting effort would mislead future hint
 * generation about how much the user has already tried.
 */
export declare function resetSession(session: SessionState): SessionState;
/**
 * Throws `LeetCodeError(HINT_LEVEL_TOO_LOW)` unless the session has
 * reached the level required to unlock the canonical solution.
 *
 * `list_problem_solutions` and `get_problem_solution` MUST call this
 * before returning content. If the session doesn't exist (the user
 * never called `start_problem`) callers should throw
 * `SESSION_NOT_FOUND` themselves — that's a different failure mode and
 * the agent should react differently to it.
 */
export declare function assertSolutionUnlocked(session: SessionState): void;
