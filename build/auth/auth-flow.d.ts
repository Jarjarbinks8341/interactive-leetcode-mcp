/**
 * Authentication helpers that bridge the on-disk credentials store and the
 * in-memory `LeetcodeServiceInterface`.
 *
 * Closes the silent-logout-on-restart gap where saved credentials existed in
 * `~/.leetcode-mcp/credentials.json` but the running server never re-hydrated
 * them, so every authenticated tool failed with "Authentication required" until
 * the user pasted their cookies again.
 */
import { LeetcodeServiceInterface } from "../leetcode/leetcode-service-interface.js";
import { CredentialsStorage } from "../types/credentials.js";
/** Outcome of an `restoreCredentials` call — useful in tests and logs. */
export type RestoreOutcome =
    | {
          status: "no_credentials";
      }
    | {
          status: "invalid";
          reason: "load_failed" | "expired";
      }
    | {
          status: "restored";
          username: string;
      };
/**
 * Loads saved credentials from disk, validates them against LeetCode, and
 * pushes them into the running service if they're still good.
 *
 * Safe to call at server startup; never throws — failures are logged and the
 * outcome is returned for callers that want to react.
 */
export declare function restoreCredentials(
    service: LeetcodeServiceInterface,
    storage?: CredentialsStorage
): Promise<RestoreOutcome>;
/**
 * Validates `csrf` / `session` against LeetCode and, on success, pushes them
 * into the running service so the very next authenticated tool call works
 * without forcing a server restart.
 *
 * Returns the validated username, or `null` if LeetCode rejected the cookies.
 * Trusts the `validateCredentials` interface contract (`Promise<string | null>`)
 * and does not catch — any exception thrown by the service propagates.
 */
export declare function applyValidatedCredentials(
    service: LeetcodeServiceInterface,
    csrf: string,
    session: string
): Promise<string | null>;
