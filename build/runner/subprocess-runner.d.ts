import type {
    RunInput,
    RunResult,
    RunnerCapabilities
} from "../types/index.js";
import type { LocalRunner } from "./runner.js";
/** Test helper — clears the probe cache so unit tests can re-detect. */
export declare function __resetProbeCacheForTest(): void;
export declare class SubprocessRunner implements LocalRunner {
    capabilities(): Promise<RunnerCapabilities>;
    run(input: RunInput): Promise<RunResult>;
    private spawnAndCapture;
}
