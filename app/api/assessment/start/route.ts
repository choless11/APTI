import { localizeSoultraceQuestion } from "@/src/lib/question-localization";
import { SoultraceProxyError, requestSoultrace } from "@/src/lib/soultrace";
import type { AssessmentApiPayload } from "@/src/types/soultrace";

export async function POST() {
  try {
    // 初始化问卷时必须显式从空答案开始，SoulTrace 才会返回第一题。
    const response = await requestSoultrace([]);

    if (response.status !== "in_progress") {
      throw new Error("问卷初始化失败，未拿到题目。");
    }

    const payload: AssessmentApiPayload = {
      status: "in_progress",
      question: localizeSoultraceQuestion(response.question),
      currentDistribution: response.currentDistribution,
      entropy: response.entropy,
      progress: response.progress,
    };

    return Response.json(payload);
  } catch (error: unknown) {
    const status = error instanceof SoultraceProxyError ? error.status : 500;

    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "问卷初始化失败，请稍后重试。",
      },
      { status },
    );
  }
}
