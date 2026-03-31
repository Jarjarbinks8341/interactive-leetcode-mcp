/**
 * GraphQL query for fetching solutions for a problem on LeetCode Global
 * `orderBy` can be one of [HOT, MOST_RECENT, MOST_VOTES]
 */
export declare const SOLUTION_ARTICLES_QUERY =
    "\nquery ugcArticleSolutionArticles(\n  $questionSlug: String!\n  $orderBy: ArticleOrderByEnum\n  $userInput: String\n  $tagSlugs: [String!]\n  $skip: Int\n  $before: String\n  $after: String\n  $first: Int\n  $last: Int\n  $isMine: Boolean\n) {\n  ugcArticleSolutionArticles(\n    questionSlug: $questionSlug\n    orderBy: $orderBy\n    userInput: $userInput\n    tagSlugs: $tagSlugs\n    skip: $skip\n    first: $first\n    before: $before\n    after: $after\n    last: $last\n    isMine: $isMine\n  ) {\n    totalNum\n    pageInfo {\n      hasNextPage\n    }\n    edges {\n      node {\n        title\n        topicId\n        summary\n        slug\n        canSee\n        hasVideoArticle\n      }\n    }\n  }\n}";
