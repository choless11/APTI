import { getMockSoultraceResponse } from "@/src/lib/mock-soultrace";
import {
  getSoultraceApiUrl,
  getSoultraceTimeoutMs,
  isSoultraceMockMode,
} from "@/src/lib/env";
import type {
  AnswerInput,
  SoultraceApiResponse,
} from "@/src/types/soultrace";

export class SoultraceProxyError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "SoultraceProxyError";
    this.status = status;
  }
}

function toJsonBody(answers: AnswerInput[]) {
  return JSON.stringify({ answers });
}

function getErrorMessage(status: number) {
  if (status === 400) {
    return "SoulTrace 拒绝了这次请求，请稍后重新开始测试。";
  }

  if (status === 429) {
    return "当前请求次数较多，SoulTrace 暂时限流了，请稍后再试。";
  }

  return "SoulTrace 服务暂时不可用，请稍后重试。";
}

export async function requestSoultrace(
  answers: AnswerInput[],
): Promise<SoultraceApiResponse> {
  if (isSoultraceMockMode()) {
    return getMockSoultraceResponse(answers);
  }

  const response = await fetch(getSoultraceApiUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: toJsonBody(answers),
    signal: AbortSignal.timeout(getSoultraceTimeoutMs()),
    cache: "no-store",
  }).catch((error: unknown) => {
    throw new SoultraceProxyError(
      error instanceof Error && error.name === "TimeoutError"
        ? "请求 SoulTrace 超时了，请稍后重试。"
        : "连接 SoulTrace 失败，请检查网络后重试。",
      504,
    );
  });

  if (!response.ok) {
    throw new SoultraceProxyError(getErrorMessage(response.status), response.status);
  }

  return (await response.json()) as SoultraceApiResponse;
}
