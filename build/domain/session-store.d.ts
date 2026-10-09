import type { SessionState } from "../types/index.js";
export interface SessionStore {
    /** Resolves to the saved session, or `null` if none exists / is unreadable. */
    load(slug: string): Promise<SessionState | null>;
    /** Persists the session, creating the sessions directory if needed. */
    save(session: SessionState): Promise<void>;
    /** Removes the file. Idempotent — missing file is not an error. */
    delete(slug: string): Promise<void>;
    /** Absolute path of the file backing a given slug. */
    pathFor(slug: string): string;
}
export interface FileSessionStoreOptions {
    /**
     * Override the directory the store writes to. Defaults to
     * `${homedir()}/.leetcode-mcp/sessions`. Tests pass a temp directory.
     */
    dir?: string;
}
/**
 * Default filesystem-backed implementation. Writes are atomic-ish — same
 * pattern as `credentialsStorage`: write JSON, mode 0o600 (sessions are
 * not secrets but neither are they other-readable by intent).
 */
export declare class FileSessionStore implements SessionStore {
    private readonly dir;
    constructor(options?: FileSessionStoreOptions);
    pathFor(slug: string): string;
    load(slug: string): Promise<SessionState | null>;
    save(session: SessionState): Promise<void>;
    delete(slug: string): Promise<void>;
}
