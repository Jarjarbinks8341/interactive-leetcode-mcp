/**
 * Generates per-level hint text for a given problem.
 *
 * Phase 3 ships generic hints derived from the problem's existing
 * `hints` and `topicTags`. Phase 5 (workspace awareness) extends this by
 * accepting the user's actual code so the level-2/3 messages can
 * critique what they wrote rather than describing the problem in the
 * abstract. The `userCode` parameter is already in the signature to keep
 * the contract stable across phases.
 */
import type { HintLevel, SimplifiedProblem } from "../types/index.js";
/**
 * Pure projection from problem + level → hint text. No IO.
 *
 * The contract per level matches `HintLevel`'s docstring:
 *   1 — clarification (restate, edge cases)
 *   2 — approach (paradigm / data structure)
 *   3 — implementation sketch (pseudocode-level)
 *   4 — optimal (full solution; the agent should call
 *       `get_problem_solution` once this level is reached, not paraphrase)
 *
 * Level 0 is "no hint requested yet" and is never produced by this
 * function — callers should never ask for it.
 *
 * `userCode` is reserved for Phase 5; if provided, future levels will
 * incorporate it. The Phase 3 implementation ignores it.
 */
export declare function generateHint(
    problem: SimplifiedProblem,
    level: Exclude<HintLevel, 0>,
    _userCode?: string
): string;
