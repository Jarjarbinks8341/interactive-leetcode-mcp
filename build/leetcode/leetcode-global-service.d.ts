import { Credential, LeetCode } from "leetcode-query";
import { SubmissionResult } from "../types/submission.js";
import { LeetcodeServiceInterface } from "./leetcode-service-interface.js";
/**
 * LeetCode Global API Service Implementation
 */
export declare class LeetCodeGlobalService implements LeetcodeServiceInterface {
    private readonly leetCodeApi;
    private readonly credential;
    constructor(leetCodeApi: LeetCode, credential: Credential);
    fetchUserSubmissionDetail(id: number): Promise<any>;
    fetchUserStatus(): Promise<any>;
    fetchUserAllSubmissions(options: {
        offset: number;
        limit: number;
        questionSlug?: string;
        lastKey?: string;
        lang?: string;
        status?: string;
    }): Promise<any>;
    fetchUserRecentSubmissions(username: string, limit?: number): Promise<any>;
    fetchUserRecentACSubmissions(
        username: string,
        limit?: number
    ): Promise<any>;
    fetchUserProfile(username: string): Promise<any>;
    fetchUserContestRanking(username: string, attended?: boolean): Promise<any>;
    fetchDailyChallenge(): Promise<any>;
    fetchProblem(titleSlug: string): Promise<any>;
    fetchProblemSimplified(titleSlug: string): Promise<any>;
    searchProblems(
        category?: string,
        tags?: string[],
        difficulty?: string,
        limit?: number,
        offset?: number,
        searchKeywords?: string
    ): Promise<any>;
    fetchUserProgressQuestionList(options?: {
        offset?: number;
        limit?: number;
        questionStatus?: string;
        difficulty?: string[];
    }): Promise<any>;
    /**
     * Retrieves a list of solutions for a specific problem.
     *
     * @param questionSlug - The URL slug/identifier of the problem
     * @param options - Optional parameters for filtering and sorting the solutions
     * @returns Promise resolving to the solutions list data
     */
    fetchQuestionSolutionArticles(
        questionSlug: string,
        options?: any
    ): Promise<any>;
    /**
     * Retrieves detailed information about a specific solution on LeetCode.
     *
     * @param topicId - The topic ID of the solution
     * @returns Promise resolving to the solution detail data
     */
    fetchSolutionArticleDetail(topicId: string): Promise<any>;
    submitSolution(
        problemSlug: string,
        code: string,
        language: string
    ): Promise<SubmissionResult>;
    private getQuestionId;
    isAuthenticated(): boolean;
    validateCredentials(csrf: string, session: string): Promise<string | null>;
    updateCredentials(csrf: string, session: string): void;
    fetchNoteByTitleSlug(titleSlug: string): Promise<{
        questionId: string;
        note: string;
    }>;
    updateNoteByTitleSlug(
        titleSlug: string,
        content: string
    ): Promise<{
        ok: boolean;
        error?: string;
    }>;
    deleteNoteByTitleSlug(titleSlug: string): Promise<{
        ok: boolean;
        error?: string;
    }>;
}
