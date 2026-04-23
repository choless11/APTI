import { resolveAptiResult } from "@/src/lib/apti-results";
import { localizeSoultraceQuestion } from "@/src/lib/question-localization";
import { SoultraceProxyError, requestSoultrace } from "@/src/lib/soultrace";
import type {
  AnswerInput,
  AssessmentApiPayload,
  ScoreValue,
} from "@/src/types/soultrace";

function isValidScore(value: number): value is ScoreValue {
  return Number.isInteger(value) && value >= 1 && value <= 7;
}

function parseAnswers(rawValue: unknown): AnswerInput[] {
  if (!Array.isArray(rawValue) || rawValue.length === 0) {
    throw new SoultraceProxyError("请至少提交一道已回答的问题。", 400);
  }

  return rawValue.map((item) => {
    const candidate = item as { questionId?: unknown; score?: unknown };

    if (
      !item ||
      typeof item !== "object" ||
      typeof candidate.questionId !== "number" ||
      typeof candidate.score !== "number" ||
      !isValidScore(candidate.score)
    ) {
      throw new SoultraceProxyError("答案格式不合法，请重新作答。", 400);
    }

    return {
      questionId: candidate.questionId,
      score: candidate.score,
    };
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { answers?: unknown };
    const answers = parseAnswers(body.answers);
    const response = await requestSoultrace(answers);

    if (response.status === "in_progress") {
      const payload: AssessmentApiPayload = {
        status: "in_progress",
        question: localizeSoultraceQuestion(response.question),
        currentDistribution: response.currentDistribution,
        entropy: response.entropy,
        progress: response.progress,
      };

      return Response.json(payload);
    }

    const payload: AssessmentApiPayload = {
      status: "complete",
      result: resolveAptiResult(response.archetype.key, response),
    };

    return Response.json(payload);
  } catch (error: unknown) {
    const status =
      error instanceof SoultraceProxyError
        ? error.status
        : error instanceof SyntaxError
          ? 400
          : 500;

    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "提交答案失败，请稍后再试。",
      },
      { status },
    );
  }
}
