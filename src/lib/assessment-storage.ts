import type {
  AssessmentState,
  AptiResult,
  AnswerInput,
  SoultraceDistribution,
  SoultraceProgress,
  SoultraceQuestion,
} from "@/src/types/soultrace";

const ASSESSMENT_STATE_KEY = "apti-assessment-state";
const ASSESSMENT_RESULT_KEY = "apti-latest-result";

type StoredQuestionState = {
  phase: "question";
  status: "in_progress";
  answers: AnswerInput[];
  question: SoultraceQuestion;
  currentDistribution: SoultraceDistribution;
  entropy: number;
  progress: SoultraceProgress;
};

function canUseStorage() {
  return typeof window !== "undefined";
}

export function readStoredAssessmentState(): AssessmentState | null {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(ASSESSMENT_STATE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredQuestionState;

    if (
      parsed.phase !== "question" ||
      typeof parsed.question?.originalText !== "string" ||
      (parsed.question.localizationMode !== "curated" &&
        parsed.question.localizationMode !== "fallback")
    ) {
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(ASSESSMENT_STATE_KEY);
    return null;
  }
}

export function persistQuestionState(
  state: Extract<AssessmentState, { phase: "question" }>,
) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(ASSESSMENT_STATE_KEY, JSON.stringify(state));
}

export function clearStoredAssessmentState() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(ASSESSMENT_STATE_KEY);
}

export function persistResult(result: AptiResult) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(ASSESSMENT_RESULT_KEY, JSON.stringify(result));
}

export function readStoredResult(): AptiResult | null {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(ASSESSMENT_RESULT_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as AptiResult;
  } catch {
    window.localStorage.removeItem(ASSESSMENT_RESULT_KEY);
    return null;
  }
}

export function clearStoredResult() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(ASSESSMENT_RESULT_KEY);
}
