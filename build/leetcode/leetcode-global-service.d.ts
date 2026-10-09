import { Credential, LeetCode } from "leetcode-query";
import {
    DailyChallenge,
    Problem,
    ProblemSearchResult,
    SimplifiedProblem
} from "../types/problem.js";
import {
    SolutionArticleDetail,
    SolutionArticleList
} from "../types/solution.js";
import { SubmissionResult } from "../types/submission.js";
import {
    UserAllSubmissions,
    UserContestInfo,
    UserProfile,
    UserProgressQuestionList,
    UserRecentACSubmissions,
    UserRecentSubmissions,
    UserStatus,
    UserSubmissionDetail
} from "../types/user.js";
import {
    LeetcodeServiceInterface,
    SolutionArticlesQueryOptions
} from "./leetcode-service-interface.js";
/**
 * LeetCode Global API Service Implementation
 */
export declare class LeetCodeGlobalService implements LeetcodeServiceInterface {
    private readonly leetCodeApi;
    private readonly credential;
    constructor(leetCodeApi: LeetCode, credential: Credential);
    fetchUserSubmissionDetail(id: number): Promise<UserSubmissionDetail>;
    fetchUserStatus(): Promise<UserStatus>;
    fetchUserAllSubmissions(options: {
        offset: number;
        limit: number;
        questionSlug?: string;
    }): Promise<UserAllSubmissions>;
    fetchUserRecentSubmissions(
        username: string,
        limit?: number
    ): Promise<UserRecentSubmissions>;
    fetchUserRecentACSubmissions(
        username: string,
        limit?: number
    ): Promise<UserRecentACSubmissions>;
    fetchUserProfile(username: string): Promise<UserProfile>;
    fetchUserContestRanking(
        username: string,
        attended?: boolean
    ): Promise<UserContestInfo>;
    fetchDailyChallenge(): Promise<DailyChallenge>;
    fetchProblem(titleSlug: string): Promise<Problem>;
    fetchProblemSimplified(titleSlug: string): Promise<SimplifiedProblem>;
    searchProblems(
        category?: string,
        tags?: string[],
        difficulty?: string,
        limit?: number,
        offset?: number,
        searchKeywords?: string
    ): Promise<ProblemSearchResult>;
    fetchUserProgressQuestionList(filters: {
        offset: number;
        limit: number;
        questionStatus?: string;
        difficulty?: string[];
    }): Promise<UserProgressQuestionList>;
    /**
     * Retrieves a list of solutions for a specific problem.
     *
     * @param questionSlug - The URL slug/identifier of the problem
     * @param options - Optional parameters for filtering and sorting the solutions
     * @returns Promise resolving to the solutions list data
     */
    fetchQuestionSolutionArticles(
        questionSlug: string,
        options?: SolutionArticlesQueryOptions
    ): Promise<SolutionArticleList>;
    /**
     * Retrieves detailed information about a specific solution on LeetCode.
     *
     * @param topicId - The topic ID of the solution
     * @returns Promise resolving to the solution detail data
     */
    fetchSolutionArticleDetail(
        topicId: string
    ): Promise<SolutionArticleDetail | null>;
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
