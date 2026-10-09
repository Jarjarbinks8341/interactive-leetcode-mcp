/**
 * Application-layer wrapper around the session store + state machine +
 * hint generator. Tools should depend on this, not on the lower-level
 * pieces directly — it's the seam that makes the gate uniform.
 */
import {
    type HintLevel,
    type SessionState,
    type SimplifiedProblem
} from "../types/index.js";
import { type SessionStore } from "./session-store.js";
export interface StartProblemInput {
    slug: string;
    language?: string;
}
export declare class SessionService {
    private readonly store;
    private readonly mutationQueues;
    constructor(store?: SessionStore);
    private withSessionMutation;
    /**
     * Returns the existing session for a slug, or creates a fresh
     * level-0 session if none exists. Idempotent: starting a problem the
     * user already started just returns the in-progress session
     * unchanged (so you don't lose hint progress by re-running
     * `start_problem`).
     */
    startOrResume(input: StartProblemInput): Promise<SessionState>;
    /** Returns the session, or `null` if `start_problem` was never called. */
    get(slug: string): Promise<SessionState | null>;
    /**
     * Advances the hint level by one and returns the new session +
     * generated hint text. The text is produced from the supplied
     * problem so callers don't need to load it twice.
     *
     * Throws `SESSION_NOT_FOUND` if the user never opened the problem.
     */
    advance(
        slug: string,
        problem: SimplifiedProblem
    ): Promise<{
        session: SessionState;
        hint: string;
        level: HintLevel;
    }>;
    /** Resets the session back to the level-0 initial state. */
    reset(slug: string): Promise<SessionState>;
    /**
     * Throws if the canonical solution is not yet unlocked for `slug`.
     * If `slug` is undefined, accepts the operation when *any* known
     * session has reached the maximum level — the only way for the
     * agent to obtain a `topicId` is via `list_problem_solutions`,
     * which IS slug-gated, so this is sufficient for the typical flow.
     */
    assertSolutionUnlocked(slug?: string): Promise<void>;
    /**
     * Public variant of the session lookup — throws `SESSION_NOT_FOUND`
     * when the user never opened the slug. Used by the runner-tools
     * layer to keep `run_local_tests` aligned with the pedagogy state
     * machine (no orphaned runs).
     */
    requireSession(slug: string): Promise<SessionState>;
    /**
     * Updates the session after a `run_local_tests` invocation. Increments
     * `attempts`, records the pass/fail result and matching source snapshot,
     * and bumps `status` to "attempting" on active failed runs so the
     * lifecycle remains aligned with the latest local result.
     */
    recordLocalRun(
        slug: string,
        passed: boolean,
        snapshot?: string
    ): Promise<SessionState>;
}
