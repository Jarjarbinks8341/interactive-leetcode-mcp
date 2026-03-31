/**
 * GraphQL query for fetching a solution's detail on LeetCode Global
 */
export declare const SOLUTION_ARTICLE_DETAIL_QUERY =
    "\nquery ugcArticleSolutionArticle($articleId: ID, $topicId: ID) {\n  ugcArticleSolutionArticle(articleId: $articleId, topicId: $topicId) {\n    title\n    slug\n    content\n    tags {\n      slug\n    }\n    topic {\n      id\n    }\n    prev {\n      uuid\n      slug\n      topicId\n      title\n    }\n    next {\n      slug\n      topicId\n    }\n  }\n}";
