export interface LocalRunSnapshotInput {
    code: string;
    language: string;
}
export declare function createLocalRunSnapshot(
    input: LocalRunSnapshotInput
): string;
