/**
 * Runtime validators for payloads coming back from LeetCode.
 *
 * These are the *minimum* schemas needed to tell whether the upstream still
 * speaks the contract our types describe. They use `passthrough()` so unknown
 * fields are kept (we re-emit some payloads verbatim to MCP clients), and they
 * mark fields optional when LeetCode has been observed to omit them.
 *
 * Use `parse` (throws `ZodError`) at the service boundary when we want to fail
 * loudly, and `safeParse` when we want to log-and-fall-back. Translate any
 * `ZodError` into `new LeetCodeError(ErrorCode.UPSTREAM_PAYLOAD_INVALID, ...)`
 * so the MCP layer can render a structured error.
 */
import { z } from "zod";
export declare const SubmitResponseSchema: z.ZodObject<
    {
        submission_id: z.ZodNumber;
    },
    "passthrough",
    z.ZodTypeAny,
    z.objectOutputType<
        {
            submission_id: z.ZodNumber;
        },
        z.ZodTypeAny,
        "passthrough"
    >,
    z.objectInputType<
        {
            submission_id: z.ZodNumber;
        },
        z.ZodTypeAny,
        "passthrough"
    >
>;
export declare const CheckResponseSchema: z.ZodObject<
    {
        state: z.ZodString;
        status_msg: z.ZodOptional<z.ZodString>;
        status_code: z.ZodOptional<z.ZodNumber>;
        runtime: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        memory: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        runtime_percentile: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        memory_percentile: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        code_answer: z.ZodOptional<
            z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodString]>
        >;
        expected_answer: z.ZodOptional<
            z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodString]>
        >;
        input: z.ZodOptional<z.ZodString>;
        std_output: z.ZodOptional<z.ZodString>;
        compile_error: z.ZodOptional<z.ZodString>;
        full_compile_error: z.ZodOptional<z.ZodString>;
        runtime_error: z.ZodOptional<z.ZodString>;
        full_runtime_error: z.ZodOptional<z.ZodString>;
        total_correct: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        total_testcases: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    },
    "passthrough",
    z.ZodTypeAny,
    z.objectOutputType<
        {
            state: z.ZodString;
            status_msg: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            runtime: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            memory: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            runtime_percentile: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            memory_percentile: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            code_answer: z.ZodOptional<
                z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodString]>
            >;
            expected_answer: z.ZodOptional<
                z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodString]>
            >;
            input: z.ZodOptional<z.ZodString>;
            std_output: z.ZodOptional<z.ZodString>;
            compile_error: z.ZodOptional<z.ZodString>;
            full_compile_error: z.ZodOptional<z.ZodString>;
            runtime_error: z.ZodOptional<z.ZodString>;
            full_runtime_error: z.ZodOptional<z.ZodString>;
            total_correct: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            total_testcases: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        },
        z.ZodTypeAny,
        "passthrough"
    >,
    z.objectInputType<
        {
            state: z.ZodString;
            status_msg: z.ZodOptional<z.ZodString>;
            status_code: z.ZodOptional<z.ZodNumber>;
            runtime: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            memory: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            runtime_percentile: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            memory_percentile: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            code_answer: z.ZodOptional<
                z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodString]>
            >;
            expected_answer: z.ZodOptional<
                z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodString]>
            >;
            input: z.ZodOptional<z.ZodString>;
            std_output: z.ZodOptional<z.ZodString>;
            compile_error: z.ZodOptional<z.ZodString>;
            full_compile_error: z.ZodOptional<z.ZodString>;
            runtime_error: z.ZodOptional<z.ZodString>;
            full_runtime_error: z.ZodOptional<z.ZodString>;
            total_correct: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            total_testcases: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        },
        z.ZodTypeAny,
        "passthrough"
    >
>;
export declare const QuestionIdResponseSchema: z.ZodObject<
    {
        data: z.ZodObject<
            {
                question: z.ZodOptional<
                    z.ZodNullable<
                        z.ZodObject<
                            {
                                questionId: z.ZodString;
                                questionFrontendId: z.ZodOptional<z.ZodString>;
                            },
                            "strip",
                            z.ZodTypeAny,
                            {
                                questionId: string;
                                questionFrontendId?: string | undefined;
                            },
                            {
                                questionId: string;
                                questionFrontendId?: string | undefined;
                            }
                        >
                    >
                >;
            },
            "passthrough",
            z.ZodTypeAny,
            z.objectOutputType<
                {
                    question: z.ZodOptional<
                        z.ZodNullable<
                            z.ZodObject<
                                {
                                    questionId: z.ZodString;
                                    questionFrontendId: z.ZodOptional<z.ZodString>;
                                },
                                "strip",
                                z.ZodTypeAny,
                                {
                                    questionId: string;
                                    questionFrontendId?: string | undefined;
                                },
                                {
                                    questionId: string;
                                    questionFrontendId?: string | undefined;
                                }
                            >
                        >
                    >;
                },
                z.ZodTypeAny,
                "passthrough"
            >,
            z.objectInputType<
                {
                    question: z.ZodOptional<
                        z.ZodNullable<
                            z.ZodObject<
                                {
                                    questionId: z.ZodString;
                                    questionFrontendId: z.ZodOptional<z.ZodString>;
                                },
                                "strip",
                                z.ZodTypeAny,
                                {
                                    questionId: string;
                                    questionFrontendId?: string | undefined;
                                },
                                {
                                    questionId: string;
                                    questionFrontendId?: string | undefined;
                                }
                            >
                        >
                    >;
                },
                z.ZodTypeAny,
                "passthrough"
            >
        >;
    },
    "passthrough",
    z.ZodTypeAny,
    z.objectOutputType<
        {
            data: z.ZodObject<
                {
                    question: z.ZodOptional<
                        z.ZodNullable<
                            z.ZodObject<
                                {
                                    questionId: z.ZodString;
                                    questionFrontendId: z.ZodOptional<z.ZodString>;
                                },
                                "strip",
                                z.ZodTypeAny,
                                {
                                    questionId: string;
                                    questionFrontendId?: string | undefined;
                                },
                                {
                                    questionId: string;
                                    questionFrontendId?: string | undefined;
                                }
                            >
                        >
                    >;
                },
                "passthrough",
                z.ZodTypeAny,
                z.objectOutputType<
                    {
                        question: z.ZodOptional<
                            z.ZodNullable<
                                z.ZodObject<
                                    {
                                        questionId: z.ZodString;
                                        questionFrontendId: z.ZodOptional<z.ZodString>;
                                    },
                                    "strip",
                                    z.ZodTypeAny,
                                    {
                                        questionId: string;
                                        questionFrontendId?: string | undefined;
                                    },
                                    {
                                        questionId: string;
                                        questionFrontendId?: string | undefined;
                                    }
                                >
                            >
                        >;
                    },
                    z.ZodTypeAny,
                    "passthrough"
                >,
                z.objectInputType<
                    {
                        question: z.ZodOptional<
                            z.ZodNullable<
                                z.ZodObject<
                                    {
                                        questionId: z.ZodString;
                                        questionFrontendId: z.ZodOptional<z.ZodString>;
                                    },
                                    "strip",
                                    z.ZodTypeAny,
                                    {
                                        questionId: string;
                                        questionFrontendId?: string | undefined;
                                    },
                                    {
                                        questionId: string;
                                        questionFrontendId?: string | undefined;
                                    }
                                >
                            >
                        >;
                    },
                    z.ZodTypeAny,
                    "passthrough"
                >
            >;
        },
        z.ZodTypeAny,
        "passthrough"
    >,
    z.objectInputType<
        {
            data: z.ZodObject<
                {
                    question: z.ZodOptional<
                        z.ZodNullable<
                            z.ZodObject<
                                {
                                    questionId: z.ZodString;
                                    questionFrontendId: z.ZodOptional<z.ZodString>;
                                },
                                "strip",
                                z.ZodTypeAny,
                                {
                                    questionId: string;
                                    questionFrontendId?: string | undefined;
                                },
                                {
                                    questionId: string;
                                    questionFrontendId?: string | undefined;
                                }
                            >
                        >
                    >;
                },
                "passthrough",
                z.ZodTypeAny,
                z.objectOutputType<
                    {
                        question: z.ZodOptional<
                            z.ZodNullable<
                                z.ZodObject<
                                    {
                                        questionId: z.ZodString;
                                        questionFrontendId: z.ZodOptional<z.ZodString>;
                                    },
                                    "strip",
                                    z.ZodTypeAny,
                                    {
                                        questionId: string;
                                        questionFrontendId?: string | undefined;
                                    },
                                    {
                                        questionId: string;
                                        questionFrontendId?: string | undefined;
                                    }
                                >
                            >
                        >;
                    },
                    z.ZodTypeAny,
                    "passthrough"
                >,
                z.objectInputType<
                    {
                        question: z.ZodOptional<
                            z.ZodNullable<
                                z.ZodObject<
                                    {
                                        questionId: z.ZodString;
                                        questionFrontendId: z.ZodOptional<z.ZodString>;
                                    },
                                    "strip",
                                    z.ZodTypeAny,
                                    {
                                        questionId: string;
                                        questionFrontendId?: string | undefined;
                                    },
                                    {
                                        questionId: string;
                                        questionFrontendId?: string | undefined;
                                    }
                                >
                            >
                        >;
                    },
                    z.ZodTypeAny,
                    "passthrough"
                >
            >;
        },
        z.ZodTypeAny,
        "passthrough"
    >
>;
export declare const ValidateCredentialsResponseSchema: z.ZodObject<
    {
        data: z.ZodObject<
            {
                userStatus: z.ZodOptional<
                    z.ZodObject<
                        {
                            username: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                            isSignedIn: z.ZodBoolean;
                        },
                        "passthrough",
                        z.ZodTypeAny,
                        z.objectOutputType<
                            {
                                username: z.ZodOptional<
                                    z.ZodNullable<z.ZodString>
                                >;
                                isSignedIn: z.ZodBoolean;
                            },
                            z.ZodTypeAny,
                            "passthrough"
                        >,
                        z.objectInputType<
                            {
                                username: z.ZodOptional<
                                    z.ZodNullable<z.ZodString>
                                >;
                                isSignedIn: z.ZodBoolean;
                            },
                            z.ZodTypeAny,
                            "passthrough"
                        >
                    >
                >;
            },
            "passthrough",
            z.ZodTypeAny,
            z.objectOutputType<
                {
                    userStatus: z.ZodOptional<
                        z.ZodObject<
                            {
                                username: z.ZodOptional<
                                    z.ZodNullable<z.ZodString>
                                >;
                                isSignedIn: z.ZodBoolean;
                            },
                            "passthrough",
                            z.ZodTypeAny,
                            z.objectOutputType<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                z.ZodTypeAny,
                                "passthrough"
                            >,
                            z.objectInputType<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                z.ZodTypeAny,
                                "passthrough"
                            >
                        >
                    >;
                },
                z.ZodTypeAny,
                "passthrough"
            >,
            z.objectInputType<
                {
                    userStatus: z.ZodOptional<
                        z.ZodObject<
                            {
                                username: z.ZodOptional<
                                    z.ZodNullable<z.ZodString>
                                >;
                                isSignedIn: z.ZodBoolean;
                            },
                            "passthrough",
                            z.ZodTypeAny,
                            z.objectOutputType<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                z.ZodTypeAny,
                                "passthrough"
                            >,
                            z.objectInputType<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                z.ZodTypeAny,
                                "passthrough"
                            >
                        >
                    >;
                },
                z.ZodTypeAny,
                "passthrough"
            >
        >;
    },
    "passthrough",
    z.ZodTypeAny,
    z.objectOutputType<
        {
            data: z.ZodObject<
                {
                    userStatus: z.ZodOptional<
                        z.ZodObject<
                            {
                                username: z.ZodOptional<
                                    z.ZodNullable<z.ZodString>
                                >;
                                isSignedIn: z.ZodBoolean;
                            },
                            "passthrough",
                            z.ZodTypeAny,
                            z.objectOutputType<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                z.ZodTypeAny,
                                "passthrough"
                            >,
                            z.objectInputType<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                z.ZodTypeAny,
                                "passthrough"
                            >
                        >
                    >;
                },
                "passthrough",
                z.ZodTypeAny,
                z.objectOutputType<
                    {
                        userStatus: z.ZodOptional<
                            z.ZodObject<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                "passthrough",
                                z.ZodTypeAny,
                                z.objectOutputType<
                                    {
                                        username: z.ZodOptional<
                                            z.ZodNullable<z.ZodString>
                                        >;
                                        isSignedIn: z.ZodBoolean;
                                    },
                                    z.ZodTypeAny,
                                    "passthrough"
                                >,
                                z.objectInputType<
                                    {
                                        username: z.ZodOptional<
                                            z.ZodNullable<z.ZodString>
                                        >;
                                        isSignedIn: z.ZodBoolean;
                                    },
                                    z.ZodTypeAny,
                                    "passthrough"
                                >
                            >
                        >;
                    },
                    z.ZodTypeAny,
                    "passthrough"
                >,
                z.objectInputType<
                    {
                        userStatus: z.ZodOptional<
                            z.ZodObject<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                "passthrough",
                                z.ZodTypeAny,
                                z.objectOutputType<
                                    {
                                        username: z.ZodOptional<
                                            z.ZodNullable<z.ZodString>
                                        >;
                                        isSignedIn: z.ZodBoolean;
                                    },
                                    z.ZodTypeAny,
                                    "passthrough"
                                >,
                                z.objectInputType<
                                    {
                                        username: z.ZodOptional<
                                            z.ZodNullable<z.ZodString>
                                        >;
                                        isSignedIn: z.ZodBoolean;
                                    },
                                    z.ZodTypeAny,
                                    "passthrough"
                                >
                            >
                        >;
                    },
                    z.ZodTypeAny,
                    "passthrough"
                >
            >;
        },
        z.ZodTypeAny,
        "passthrough"
    >,
    z.objectInputType<
        {
            data: z.ZodObject<
                {
                    userStatus: z.ZodOptional<
                        z.ZodObject<
                            {
                                username: z.ZodOptional<
                                    z.ZodNullable<z.ZodString>
                                >;
                                isSignedIn: z.ZodBoolean;
                            },
                            "passthrough",
                            z.ZodTypeAny,
                            z.objectOutputType<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                z.ZodTypeAny,
                                "passthrough"
                            >,
                            z.objectInputType<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                z.ZodTypeAny,
                                "passthrough"
                            >
                        >
                    >;
                },
                "passthrough",
                z.ZodTypeAny,
                z.objectOutputType<
                    {
                        userStatus: z.ZodOptional<
                            z.ZodObject<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                "passthrough",
                                z.ZodTypeAny,
                                z.objectOutputType<
                                    {
                                        username: z.ZodOptional<
                                            z.ZodNullable<z.ZodString>
                                        >;
                                        isSignedIn: z.ZodBoolean;
                                    },
                                    z.ZodTypeAny,
                                    "passthrough"
                                >,
                                z.objectInputType<
                                    {
                                        username: z.ZodOptional<
                                            z.ZodNullable<z.ZodString>
                                        >;
                                        isSignedIn: z.ZodBoolean;
                                    },
                                    z.ZodTypeAny,
                                    "passthrough"
                                >
                            >
                        >;
                    },
                    z.ZodTypeAny,
                    "passthrough"
                >,
                z.objectInputType<
                    {
                        userStatus: z.ZodOptional<
                            z.ZodObject<
                                {
                                    username: z.ZodOptional<
                                        z.ZodNullable<z.ZodString>
                                    >;
                                    isSignedIn: z.ZodBoolean;
                                },
                                "passthrough",
                                z.ZodTypeAny,
                                z.objectOutputType<
                                    {
                                        username: z.ZodOptional<
                                            z.ZodNullable<z.ZodString>
                                        >;
                                        isSignedIn: z.ZodBoolean;
                                    },
                                    z.ZodTypeAny,
                                    "passthrough"
                                >,
                                z.objectInputType<
                                    {
                                        username: z.ZodOptional<
                                            z.ZodNullable<z.ZodString>
                                        >;
                                        isSignedIn: z.ZodBoolean;
                                    },
                                    z.ZodTypeAny,
                                    "passthrough"
                                >
                            >
                        >;
                    },
                    z.ZodTypeAny,
                    "passthrough"
                >
            >;
        },
        z.ZodTypeAny,
        "passthrough"
    >
>;
