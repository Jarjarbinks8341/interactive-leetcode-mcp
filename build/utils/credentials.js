import { promises as fs } from "fs";
import { homedir } from "os";
import { join } from "path";
const DEFAULT_CREDENTIALS_DIR = join(homedir(), ".leetcode-mcp");
export class FileCredentialsStorage {
    credentialsDir;
    credentialsFile;
    constructor(credentialsDir) {
        this.credentialsDir = credentialsDir ?? DEFAULT_CREDENTIALS_DIR;
        this.credentialsFile = join(this.credentialsDir, "credentials.json");
    }
    async exists() {
        try {
            await fs.access(this.credentialsFile);
            return true;
        } catch {
            return false;
        }
    }
    async load() {
        try {
            const data = await fs.readFile(this.credentialsFile, "utf-8");
            return JSON.parse(data);
        } catch {
            return null;
        }
    }
    async save(credentials) {
        try {
            await fs.mkdir(this.credentialsDir, { recursive: true });
            await fs.writeFile(
                this.credentialsFile,
                JSON.stringify(credentials, null, 2),
                { encoding: "utf-8", mode: 0o600 }
            );
        } catch (error) {
            throw new Error(`Failed to save credentials: ${error}`);
        }
    }
    async clear() {
        try {
            await fs.unlink(this.credentialsFile);
        } catch {
            // File doesn't exist, that's fine
        }
    }
}
export const credentialsStorage = new FileCredentialsStorage();
//# sourceMappingURL=credentials.js.map
