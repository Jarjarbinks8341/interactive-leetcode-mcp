/**
 * Languages the runner currently knows about. Used by the tool layer
 * for early validation before spawning anything.
 */
export const SUPPORTED_LANGUAGES = ["python3", "go", "java"];
/**
 * The languages this build of the runner has *implemented*. Phase 4a
 * shipped `python3`; Phase 4b added `go`; Phase 4c added `java`.
 *
 * Kept distinct from `SUPPORTED_LANGUAGES` so the wire-level
 * `RUNNER_NOT_IMPLEMENTED_FOR_LANGUAGE` error has a single source of
 * truth: anything in `SUPPORTED_LANGUAGES` but not in this list is a
 * "coming soon" language.
 */
export const IMPLEMENTED_LANGUAGES = ["python3", "go", "java"];
//# sourceMappingURL=runner.js.map
