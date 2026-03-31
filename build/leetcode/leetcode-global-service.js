import axios from "axios";
import logger from "../utils/logger.js";
import { SEARCH_PROBLEMS_QUERY } from "./graphql/search-problems.js";
import { SOLUTION_ARTICLE_DETAIL_QUERY } from "./graphql/solution-article-detail.js";
import { SOLUTION_ARTICLES_QUERY } from "./graphql/solution-articles.js";
const LANGUAGE_MAP = {
    java: "java",
    python: "python3",
    python3: "python3",
    c: "c",
    cpp: "cpp",
    "c++": "cpp",
    csharp: "csharp",
    "c#": "csharp",
    javascript: "javascript",
    js: "javascript",
    typescript: "typescript",
    ts: "typescript",
    php: "php",
    swift: "swift",
    kotlin: "kotlin",
    dart: "dart",
    golang: "golang",
    go: "golang",
    ruby: "ruby",
    scala: "scala",
    rust: "rust",
    racket: "racket",
    erlang: "erlang",
    elixir: "elixir"
};
/**
 * LeetCode Global API Service Implementation
 */
export class LeetCodeGlobalService {
    leetCodeApi;
    credential;
    constructor(leetCodeApi, credential) {
        this.leetCodeApi = leetCodeApi;
        this.credential = credential;
    }
    async fetchUserSubmissionDetail(id) {
        if (!this.isAuthenticated()) {
            throw new Error(
                "Authentication required to fetch user submission detail"
            );
        }
        return await this.leetCodeApi.submission(id);
    }
    async fetchUserStatus() {
        if (!this.isAuthenticated()) {
            throw new Error("Authentication required to fetch user status");
        }
        return await this.leetCodeApi.whoami().then((res) => {
            return {
                isSignedIn: res?.isSignedIn ?? false,
                username: res?.username ?? "",
                avatar: res?.avatar ?? "",
                isAdmin: res?.isAdmin ?? false
            };
        });
    }
    async fetchUserAllSubmissions(options) {
        if (!this.isAuthenticated()) {
            throw new Error(
                "Authentication required to fetch user submissions"
            );
        }
        const submissions = await this.leetCodeApi.submissions({
            offset: options.offset ?? 0,
            limit: options.limit ?? 20,
            slug: options.questionSlug
        });
        return { submissions };
    }
    async fetchUserRecentSubmissions(username, limit) {
        return await this.leetCodeApi.recent_submissions(username, limit);
    }
    async fetchUserRecentACSubmissions(username, limit) {
        return await this.leetCodeApi.graphql({
            query: `
                    query ($username: String!, $limit: Int) {
                        recentAcSubmissionList(username: $username, limit: $limit) {
                            id
                            title
                            titleSlug
                            time
                            timestamp
                            statusDisplay
                            lang
                        }
                    }

                `,
            variables: {
                username,
                limit
            }
        });
    }
    async fetchUserProfile(username) {
        const profile = await this.leetCodeApi.user(username);
        if (profile && profile.matchedUser) {
            const { matchedUser } = profile;
            return {
                username: matchedUser.username,
                realName: matchedUser.profile.realName,
                userAvatar: matchedUser.profile.userAvatar,
                countryName: matchedUser.profile.countryName,
                githubUrl: matchedUser.githubUrl,
                company: matchedUser.profile.company,
                school: matchedUser.profile.school,
                ranking: matchedUser.profile.ranking,
                totalSubmissionNum: matchedUser.submitStats?.totalSubmissionNum
            };
        }
        return profile;
    }
    async fetchUserContestRanking(username, attended = true) {
        const contestInfo = await this.leetCodeApi.user_contest_info(username);
        if (contestInfo.userContestRankingHistory) {
            if (attended) {
                contestInfo.userContestRankingHistory =
                    contestInfo.userContestRankingHistory.filter((contest) => {
                        return contest && contest.attended;
                    });
            }
        } else {
            contestInfo.userContestRankingHistory = [];
        }
        return contestInfo;
    }
    async fetchDailyChallenge() {
        return await this.leetCodeApi.daily();
    }
    async fetchProblem(titleSlug) {
        return await this.leetCodeApi.problem(titleSlug);
    }
    async fetchProblemSimplified(titleSlug) {
        const problem = await this.fetchProblem(titleSlug);
        if (!problem) {
            throw new Error(`Problem ${titleSlug} not found`);
        }
        const filteredTopicTags =
            problem.topicTags?.map((tag) => tag.slug) || [];
        const filteredCodeSnippets = problem.codeSnippets || [];
        let parsedSimilarQuestions = [];
        if (problem.similarQuestions) {
            try {
                const allQuestions = JSON.parse(problem.similarQuestions);
                parsedSimilarQuestions = allQuestions.slice(0, 3).map((q) => ({
                    titleSlug: q.titleSlug,
                    difficulty: q.difficulty
                }));
            } catch (e) {
                logger.error("Error parsing similarQuestions: %s", e);
            }
        }
        return {
            titleSlug,
            questionId: problem.questionId,
            title: problem.title,
            content: problem.content,
            difficulty: problem.difficulty,
            topicTags: filteredTopicTags,
            codeSnippets: filteredCodeSnippets,
            exampleTestcases: problem.exampleTestcases,
            hints: problem.hints,
            similarQuestions: parsedSimilarQuestions
        };
    }
    async searchProblems(
        category,
        tags,
        difficulty,
        limit = 10,
        offset = 0,
        searchKeywords
    ) {
        const filters = {};
        if (difficulty) {
            filters.difficulty = difficulty.toUpperCase();
        }
        if (tags && tags.length > 0) {
            filters.tags = tags;
        }
        if (searchKeywords) {
            filters.searchKeywords = searchKeywords;
        }
        const response = await this.leetCodeApi.graphql({
            query: SEARCH_PROBLEMS_QUERY,
            variables: {
                categorySlug: category,
                limit,
                skip: offset,
                filters
            }
        });
        const questionList = response.data?.problemsetQuestionList;
        if (!questionList) {
            return {
                total: 0,
                questions: []
            };
        }
        return {
            total: questionList.total,
            questions: questionList.questions.map((question) => ({
                title: question.title,
                titleSlug: question.titleSlug,
                difficulty: question.difficulty,
                acRate: question.acRate,
                topicTags: question.topicTags.map((tag) => tag.slug)
            }))
        };
    }
    async fetchUserProgressQuestionList(options) {
        if (!this.isAuthenticated()) {
            throw new Error(
                "Authentication required to fetch user progress question list"
            );
        }
        const filters = {
            skip: options?.offset || 0,
            limit: options?.limit || 20,
            questionStatus: options?.questionStatus,
            difficulty: options?.difficulty
        };
        return await this.leetCodeApi.user_progress_questions(filters);
    }
    /**
     * Retrieves a list of solutions for a specific problem.
     *
     * @param questionSlug - The URL slug/identifier of the problem
     * @param options - Optional parameters for filtering and sorting the solutions
     * @returns Promise resolving to the solutions list data
     */
    async fetchQuestionSolutionArticles(questionSlug, options) {
        const variables = {
            questionSlug,
            first: options?.limit || 5,
            skip: options?.skip || 0,
            orderBy: options?.orderBy || "HOT",
            userInput: options?.userInput,
            tagSlugs: options?.tagSlugs ?? []
        };
        return await this.leetCodeApi
            .graphql({
                query: SOLUTION_ARTICLES_QUERY,
                variables
            })
            .then((res) => {
                const ugcArticleSolutionArticles =
                    res.data?.ugcArticleSolutionArticles;
                if (!ugcArticleSolutionArticles) {
                    return {
                        totalNum: 0,
                        hasNextPage: false,
                        articles: []
                    };
                }
                return {
                    totalNum: ugcArticleSolutionArticles?.totalNum || 0,
                    hasNextPage:
                        ugcArticleSolutionArticles?.pageInfo?.hasNextPage ||
                        false,
                    articles:
                        ugcArticleSolutionArticles?.edges
                            ?.map((edge) => {
                                if (
                                    edge?.node &&
                                    edge.node.topicId &&
                                    edge.node.slug
                                ) {
                                    edge.node.articleUrl = `https://leetcode.com/problems/${questionSlug}/solutions/${edge.node.topicId}/${edge.node.slug}`;
                                }
                                return edge.node;
                            })
                            .filter((node) => node && node.canSee) || []
                };
            });
    }
    /**
     * Retrieves detailed information about a specific solution on LeetCode.
     *
     * @param topicId - The topic ID of the solution
     * @returns Promise resolving to the solution detail data
     */
    async fetchSolutionArticleDetail(topicId) {
        return await this.leetCodeApi
            .graphql({
                query: SOLUTION_ARTICLE_DETAIL_QUERY,
                variables: {
                    topicId
                }
            })
            .then((response) => {
                return response.data?.ugcArticleSolutionArticle;
            });
    }
    async submitSolution(problemSlug, code, language) {
        if (!this.isAuthenticated()) {
            return {
                accepted: false,
                errorMessage: "Not authorized. Please run authorization first.",
                statusMessage: "Authorization Required"
            };
        }
        // Map language to LeetCode's expected format
        const leetcodeLang = LANGUAGE_MAP[language.toLowerCase()];
        if (!leetcodeLang) {
            return {
                accepted: false,
                errorMessage: `Unsupported language: ${language}`,
                statusMessage: "Invalid Language"
            };
        }
        const baseUrl = "https://leetcode.com";
        try {
            // First, get the numeric question ID
            const questionId = await this.getQuestionId(problemSlug, baseUrl);
            // Submit solution
            const submitUrl = `${baseUrl}/problems/${problemSlug}/submit/`;
            const submitResponse = await axios.post(
                submitUrl,
                {
                    lang: leetcodeLang,
                    question_id: questionId,
                    typed_code: code
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: `csrftoken=${this.credential.csrf}; LEETCODE_SESSION=${this.credential.session}`,
                        "X-CSRFToken": this.credential.csrf,
                        Referer: `${baseUrl}/problems/${problemSlug}/`
                    }
                }
            );
            const submissionId = submitResponse.data.submission_id;
            // Poll for results
            const checkUrl = `${baseUrl}/submissions/detail/${submissionId}/check/`;
            let attempts = 0;
            const maxAttempts = 30;
            while (attempts < maxAttempts) {
                // Wait 1 second between polls
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const checkResponse = await axios.get(checkUrl, {
                    headers: {
                        Cookie: `csrftoken=${this.credential.csrf}; LEETCODE_SESSION=${this.credential.session}`
                    }
                });
                const result = checkResponse.data;
                if (
                    result.state !== "SUCCESS" &&
                    result.state !== "PENDING" &&
                    result.state !== "STARTED"
                ) {
                    return {
                        accepted: false,
                        statusMessage: "Error",
                        errorMessage: `Unexpected submission state: ${result.state}`
                    };
                }
                // Check if processing is complete
                if (result.state === "SUCCESS") {
                    const accepted = result.status_msg === "Accepted";
                    if (accepted) {
                        return {
                            accepted: true,
                            runtime: result.runtime,
                            memory: result.memory,
                            runtimePercentile: result.runtime_percentile,
                            memoryPercentile: result.memory_percentile,
                            totalCorrect: result.total_correct,
                            totalTestcases: result.total_testcases,
                            statusMessage: "Accepted"
                        };
                    } else {
                        // Failed - extract test case info
                        let failedTestCase = "";
                        if (result.input) {
                            failedTestCase = `Input: ${result.input}`;
                            if (result.expected_answer && result.code_answer) {
                                failedTestCase += `\nExpected: ${JSON.stringify(result.expected_answer)}`;
                                failedTestCase += `\nGot: ${JSON.stringify(result.code_answer)}`;
                            }
                        }
                        // Use the most specific error message available
                        const errorMessage =
                            result.full_compile_error ||
                            result.compile_error ||
                            result.full_runtime_error ||
                            result.runtime_error ||
                            result.std_output ||
                            undefined;
                        return {
                            accepted: false,
                            statusMessage: result.status_msg,
                            failedTestCase,
                            errorMessage,
                            totalCorrect: result.total_correct,
                            totalTestcases: result.total_testcases
                        };
                    }
                }
                attempts++;
            }
            // Timeout
            return {
                accepted: false,
                statusMessage: "Timeout",
                errorMessage: "Submission check timed out after 30 seconds"
            };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error;
                if (axiosError.response?.status === 401) {
                    return {
                        accepted: false,
                        statusMessage: "Unauthorized",
                        errorMessage: "Session expired. Please re-authorize."
                    };
                }
                return {
                    accepted: false,
                    statusMessage: "Submission Failed",
                    errorMessage: axiosError.message
                };
            }
            return {
                accepted: false,
                statusMessage: "Error",
                errorMessage:
                    error instanceof Error ? error.message : String(error)
            };
        }
    }
    async getQuestionId(problemSlug, baseUrl) {
        const graphqlQuery = {
            query: `
                query questionTitle($titleSlug: String!) {
                    question(titleSlug: $titleSlug) {
                        questionId
                        questionFrontendId
                    }
                }
            `,
            variables: { titleSlug: problemSlug }
        };
        const response = await axios.post(`${baseUrl}/graphql`, graphqlQuery, {
            headers: {
                "Content-Type": "application/json",
                Cookie: `csrftoken=${this.credential.csrf}; LEETCODE_SESSION=${this.credential.session}`,
                "X-CSRFToken": this.credential.csrf,
                Referer: `${baseUrl}/problems/${problemSlug}/`
            }
        });
        const question = response.data.data?.question;
        if (!question) {
            throw new Error(
                `Problem slug "${problemSlug}" not found or invalid.`
            );
        }
        return question.questionId;
    }
    isAuthenticated() {
        return (
            !!this.credential &&
            !!this.credential.csrf &&
            !!this.credential.session
        );
    }
    async validateCredentials(csrf, session) {
        try {
            // Make a simple GraphQL query to validate credentials
            const graphqlQuery = {
                query: `
                    query globalData {
                        userStatus {
                            username
                            isSignedIn
                        }
                    }
                `
            };
            const response = await axios.post(
                "https://leetcode.com/graphql",
                graphqlQuery,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: `csrftoken=${csrf}; LEETCODE_SESSION=${session}`,
                        "X-CSRFToken": csrf
                    }
                }
            );
            // Check if user is signed in and return username
            const userStatus = response.data?.data?.userStatus;
            if (userStatus?.isSignedIn === true && userStatus?.username) {
                return userStatus.username;
            }
            return null;
        } catch {
            return null;
        }
    }
    updateCredentials(csrf, session) {
        this.credential.csrf = csrf;
        this.credential.session = session;
    }
    async fetchNoteByTitleSlug(titleSlug) {
        const response = await this.leetCodeApi.graphql({
            query: `query questionNote($titleSlug: String!) { question(titleSlug: $titleSlug) { questionId note } }`,
            variables: { titleSlug }
        });
        const question = response.data?.question;
        if (!question) throw new Error(`Problem "${titleSlug}" not found`);
        return { questionId: question.questionId, note: question.note ?? "" };
    }
    async updateNoteByTitleSlug(titleSlug, content) {
        const response = await this.leetCodeApi.graphql({
            query: `mutation updateNote($titleSlug: String!, $content: String!) { updateNote(titleSlug: $titleSlug, content: $content) { ok error } }`,
            variables: { titleSlug, content }
        });
        return (
            response.data?.updateNote ?? { ok: false, error: "Unknown error" }
        );
    }
    async deleteNoteByTitleSlug(titleSlug) {
        const response = await this.leetCodeApi.graphql({
            query: `mutation deleteNote($titleSlug: String!) { deleteNote(titleSlug: $titleSlug) { ok error } }`,
            variables: { titleSlug }
        });
        return (
            response.data?.deleteNote ?? { ok: false, error: "Unknown error" }
        );
    }
}
//# sourceMappingURL=leetcode-global-service.js.map
