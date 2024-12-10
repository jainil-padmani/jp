"use client";

import { useCallback, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { capitalCase } from "capital-case";
import {
  BookOpenCheckIcon,
  CheckCircle2Icon,
  SparklesIcon,
  PenSquareIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { toastError } from "@/components/Toast";
import { LoadingContent } from "@/components/LoadingContent";
import { SlideOverSheet } from "@/components/SlideOverSheet";
import type { MessagesResponse } from "@/app/api/google/messages/route";
import { Separator } from "@/components/ui/separator";
import { TestRulesMessage } from "@/app/(app)/cold-email-blocker/TestRulesMessage";
import {
  testAiAction,
  testAiCustomContentAction,
} from "@/utils/actions/ai-rule";
import { RuleType } from "@prisma/client";
import type { RulesResponse } from "@/app/api/user/rules/route";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";
import { isActionError } from "@/utils/error";
import type { TestResult } from "@/utils/ai/choose-rule/run-rules";
import { SearchForm } from "@/components/SearchForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReportMistake } from "@/app/(app)/automation/ReportMistake";
import { cn } from "@/utils";

type Message = MessagesResponse["messages"][number];

export function TestRules(props: { disabled?: boolean }) {
  return (
    <SlideOverSheet
      title="Test Rules"
      description="Test how your rules perform against real emails."
      content={
        <div className="mt-4">
          <TestRulesContent />
        </div>
      }
    >
      <Button variant="outline" disabled={props.disabled}>
        <BookOpenCheckIcon className="mr-2 h-4 w-4" />
        Test Rules
      </Button>
    </SlideOverSheet>
  );
}

export function TestRulesContent() {
  const [searchQuery, setSearchQuery] = useQueryState("search");
  const [showCustomForm, setShowCustomForm] = useQueryState(
    "custom",
    parseAsBoolean.withDefault(false),
  );

  const { data, isLoading, error } = useSWR<MessagesResponse>(
    `/api/google/messages${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`,
    {
      keepPreviousData: true,
      dedupingInterval: 1_000,
    },
  );

  const { data: rules } = useSWR<RulesResponse>("/api/user/rules");
  const session = useSession();
  const email = session.data?.user.email;

  // only show test rules form if we have an AI rule. this form won't match group/static rules which will confuse users
  const hasAiRules = rules?.some((rule) => rule.type === RuleType.AI);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-2 px-6">
        <SearchForm onSearch={setSearchQuery} />
        {hasAiRules && (
          <Button
            variant="outline"
            onClick={() => setShowCustomForm((show) => !show)}
          >
            <PenSquareIcon className="mr-2 h-4 w-4" />
            Test Custom Content
          </Button>
        )}
      </div>

      {hasAiRules && showCustomForm && (
        <div className="mt-2">
          <CardContent>
            <TestRulesForm />
          </CardContent>
          <Separator />
        </div>
      )}

      <LoadingContent loading={isLoading} error={error}>
        {data?.messages.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            No emails found
          </div>
        ) : (
          <Table>
            <TableBody>
              {data?.messages.map((message) => (
                <TestRulesContentRow
                  key={message.id}
                  message={message}
                  userEmail={email!}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </LoadingContent>
    </div>
  );
}

type TestRulesInputs = { message: string };

const TestRulesForm = () => {
  const [testResult, setTestResult] = useState<TestResult | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestRulesInputs>();

  const onSubmit: SubmitHandler<TestRulesInputs> = useCallback(async (data) => {
    const result = await testAiCustomContentAction({
      content: data.message,
    });
    if (isActionError(result)) {
      toastError({
        title: "Error testing email",
        description: result.error,
      });
    } else {
      setTestResult(result);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Input
          type="text"
          autosizeTextarea
          rows={3}
          name="message"
          placeholder="Paste in email content or write your own. e.g. Receipt from Stripe for $49"
          registerProps={register("message", { required: true })}
          error={errors.message}
        />
        <Button type="submit" loading={isSubmitting}>
          <SparklesIcon className="mr-2 h-4 w-4" />
          Test Rules
        </Button>
      </form>
      {testResult && (
        <div className="mt-4">
          <TestResultDisplay result={testResult} message={null} />
        </div>
      )}
    </div>
  );
};

function TestRulesContentRow({
  message,
  userEmail,
}: {
  message: Message;
  userEmail: string;
}) {
  const [checking, setChecking] = useState(false);
  const [testResult, setTestResult] = useState<TestResult>();

  return (
    <TableRow>
      <TableCell>
        <div
          className={cn("grid gap-4", {
            "grid-cols-2": !!testResult,
          })}
        >
          <div className="flex items-center justify-between">
            <TestRulesMessage
              from={message.headers.from}
              subject={message.headers.subject}
              snippet={message.snippet?.trim() || ""}
              userEmail={userEmail}
            />
            <div className="ml-4">
              <Button
                variant="outline"
                loading={checking}
                onClick={async () => {
                  setChecking(true);

                  const result = await testAiAction({
                    messageId: message.id,
                    threadId: message.threadId,
                  });
                  if (isActionError(result)) {
                    toastError({
                      title: "There was an error testing the email",
                      description: result.error,
                    });
                  } else {
                    setTestResult(result);
                  }
                  setChecking(false);
                }}
              >
                <SparklesIcon className="mr-2 h-4 w-4" />
                Test
              </Button>
            </div>
          </div>
          {!!testResult && (
            <TestResultDisplay result={testResult} message={message} />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

function TestResultDisplay({
  result,
  message,
}: {
  result: TestResult;
  message: Message | null;
}) {
  if (!result) return null;

  if (!result.rule) {
    return (
      <Alert variant="destructive">
        <div className="flex items-center justify-between">
          <AlertTitle>No rule found</AlertTitle>
          {!!message && <ReportMistake result={null} message={message} />}
        </div>
        <AlertDescription>
          <div className="space-y-2">
            <div>This email does not match any of the rules you have set.</div>
            {!!result.reason && (
              <div>
                <strong>AI reason:</strong> {result.reason}
              </div>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (result.actionItems) {
    const MAX_LENGTH = 280;

    const aiGeneratedContent = result.actionItems.map((action, i) => (
      <div key={i} className="rounded-md border border-gray-200 bg-gray-50 p-3">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-900">
          {capitalCase(action.type)}
        </div>
        {Object.entries(action)
          .filter(
            ([key, value]) =>
              value &&
              ["label", "subject", "content", "to", "cc", "bcc"].includes(key),
          )
          .map(([key, value]) => (
            <div key={key} className="flex text-sm text-gray-800">
              <span className="min-w-20 font-medium text-gray-600">
                {capitalCase(key)}:
              </span>
              <span className="ml-2 flex-1">{value}</span>
            </div>
          ))}
      </div>
    ));

    return (
      <Alert variant="blue">
        <CheckCircle2Icon className="h-4 w-4" />
        <div className="flex items-center justify-between">
          <AlertTitle>Rule found: "{result.rule.name}"</AlertTitle>
          {!!message && <ReportMistake result={result} message={message} />}
        </div>
        <AlertDescription>
          <div className="mt-1.5 space-y-4">
            {result.rule.type === RuleType.AI && (
              <div className="text-sm">
                <span className="font-medium">Rule Instructions: </span>
                {result.rule.instructions.substring(0, MAX_LENGTH)}
                {result.rule.instructions.length >= MAX_LENGTH && "..."}
              </div>
            )}
            {!!aiGeneratedContent.length && (
              <div className="space-y-3">{aiGeneratedContent}</div>
            )}
            {!!result.reason && (
              <div className="border-l-2 border-blue-200 pl-3 text-sm">
                <span className="font-medium">AI Reasoning: </span>
                {result.reason}
              </div>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }
}
