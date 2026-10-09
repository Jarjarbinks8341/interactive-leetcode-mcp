/**
 * Per-problem session persistence: one JSON file per slug under
 * `~/.leetcode-mcp/sessions/<slug>.json`.
 *
 * The store is intentionally minimal — no migrations, no schemas — because
 * the data is local and rebuildable. If a file is unreadable or malformed
 * we treat it as "no session" and let the caller create a fresh one.
 */
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import logger from "../utils/logger.js";
/**
 * Slugs come from the LeetCode URL and are already filesystem-safe in
 * practice, but defend against a malicious / typo'd input that could
 * traverse the sessions directory.
 */
function assertSafeSlug(slug) {
    if (!/^[a-z0-9-]+$/.test(slug)) {
        throw new Error(
            `Invalid session slug: ${JSON.stringify(slug)}. ` +
                `Expected lowercase alphanumeric and hyphens only.`
        );
    }
}
/**
 * Default filesystem-backed implementation. Writes are atomic-ish — same
 * pattern as `credentialsStorage`: write JSON, mode 0o600 (sessions are
 * not secrets but neither are they other-readable by intent).
 */
export class FileSessionStore {
    dir;
    constructor(options = {}) {
        this.dir = options.dir ?? join(homedir(), ".leetcode-mcp", "sessions");
    }
    pathFor(slug) {
        assertSafeSlug(slug);
        return resolve(this.dir, `${slug}.json`);
    }
    async load(slug) {
        const path = this.pathFor(slug);
        try {
            await stat(path);
        } catch {
            return null;
        }
        try {
            const raw = await readFile(path, "utf-8");
            return JSON.parse(raw);
        } catch (err) {
            // Corrupt session file is recoverable — log and return null so
            // the caller can rebuild from `start_problem`.
            logger.warn(
                "Discarding malformed session file %s: %s",
                path,
                err instanceof Error ? err.message : String(err)
            );
            return null;
        }
    }
    async save(session) {
        const path = this.pathFor(session.slug);
        await mkdir(this.dir, { recursive: true, mode: 0o700 });
        await writeFile(path, JSON.stringify(session, null, 2), {
            encoding: "utf-8",
            mode: 0o600
        });
    }
    async delete(slug) {
        const path = this.pathFor(slug);
        await rm(path, { force: true });
    }
}
//# sourceMappingURL=session-store.js.map
