import { createHash } from "node:crypto";
export function createLocalRunSnapshot(input) {
    return createHash("sha256")
        .update(JSON.stringify([input.language, input.code]))
        .digest("hex");
}
//# sourceMappingURL=local-run-snapshot.js.map
