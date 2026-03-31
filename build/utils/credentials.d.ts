import {
    CredentialsStorage,
    LeetCodeCredentials
} from "../types/credentials.js";
export declare class FileCredentialsStorage implements CredentialsStorage {
    private readonly credentialsDir;
    private readonly credentialsFile;
    constructor(credentialsDir?: string);
    exists(): Promise<boolean>;
    load(): Promise<LeetCodeCredentials | null>;
    save(credentials: LeetCodeCredentials): Promise<void>;
    clear(): Promise<void>;
}
export declare const credentialsStorage: FileCredentialsStorage;
