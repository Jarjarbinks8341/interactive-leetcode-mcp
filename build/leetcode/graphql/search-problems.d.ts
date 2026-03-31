/**
 * GraphQL API for searching problems
 *
 * QuestionListFilterInput:
 * {
 *    tags: [String]
 *    difficulty: String
 *    searchKeywords: String
 * }
 */
export declare const SEARCH_PROBLEMS_QUERY =
    "\nquery (\n    $categorySlug: String\n    $limit: Int\n    $skip: Int\n    $filters: QuestionListFilterInput\n) {\n    problemsetQuestionList: questionList(\n        categorySlug: $categorySlug\n        limit: $limit\n        skip: $skip\n        filters: $filters\n    ) {\n        total: totalNum\n        questions: data {\n            acRate\n            difficulty\n            title\n            titleSlug\n            topicTags {\n                slug\n            }\n        }\n    }\n}";
