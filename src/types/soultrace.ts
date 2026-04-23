export type SoultraceColor = "white" | "blue" | "black" | "red" | "green";

export type SoultraceArchetypeKey =
  | "white"
  | "blue"
  | "black"
  | "red"
  | "green"
  | "white-blue"
  | "white-black"
  | "white-red"
  | "white-green"
  | "blue-white"
  | "blue-black"
  | "blue-red"
  | "blue-green"
  | "black-white"
  | "black-blue"
  | "black-red"
  | "black-green"
  | "red-white"
  | "red-blue"
  | "red-black"
  | "red-green"
  | "green-white"
  | "green-blue"
  | "green-black"
  | "green-red";

export type ScoreValue = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type AnswerInput = {
  questionId: number;
  score: ScoreValue;
};

export type SoultraceDistribution = Record<SoultraceColor, number>;

export type SoultraceApiQuestion = {
  id: number;
  text: string;
};

export type SoultraceQuestionLocalizationMode = "curated" | "fallback";

export type SoultraceQuestion = SoultraceApiQuestion & {
  originalText: string;
  localizationMode: SoultraceQuestionLocalizationMode;
};

export type SoultraceProgress = {
  answered: number;
  total: number;
};

export type SoultraceArchetype = {
  key: SoultraceArchetypeKey;
  name: string;
  alignmentScore: number;
  coreDynamic?: string;
  strengths?: string[];
  weaknesses?: string[];
};

export type SoultraceTopMatch = Pick<
  SoultraceArchetype,
  "key" | "name" | "alignmentScore"
>;

export type SoultraceInProgressResponse = {
  status: "in_progress";
  question: SoultraceApiQuestion;
  currentDistribution: SoultraceDistribution;
  entropy: number;
  progress: SoultraceProgress;
};

export type SoultraceCompleteResponse = {
  status: "complete";
  resultId: string;
  resultUrl: string;
  distribution: SoultraceDistribution;
  entropy: number;
  archetype: SoultraceArchetype;
  topMatches: SoultraceTopMatch[];
  shadowColors: Array<{ color: SoultraceColor; score: number }>;
  progress: SoultraceProgress;
};

export type SoultraceApiResponse =
  | SoultraceInProgressResponse
  | SoultraceCompleteResponse;

export type AptiMappedMatch = SoultraceTopMatch & {
  aptiTitle: string;
};

export type AptiResult = {
  archetypeKey: SoultraceArchetypeKey;
  archetypeName: string;
  aptiSlug: string;
  animal: string;
  profession: string;
  title: string;
  tagline: string;
  shortSummary: string;
  longSummary: string;
  strengths: string[];
  riskPoints: string[];
  recommendation: string;
  imagePath: string;
  emoji: string;
  badgeEmoji: string;
  distribution: SoultraceDistribution;
  entropy: number;
  shadowColors: Array<{ color: SoultraceColor; score: number }>;
  topMatches: AptiMappedMatch[];
  resultId: string;
  resultUrl: string;
};

export type AssessmentInProgressPayload = {
  status: "in_progress";
  question: SoultraceQuestion;
  currentDistribution: SoultraceDistribution;
  entropy: number;
  progress: SoultraceProgress;
};

export type AssessmentCompletePayload = {
  status: "complete";
  result: AptiResult;
};

export type AssessmentApiPayload =
  | AssessmentInProgressPayload
  | AssessmentCompletePayload;

export type AssessmentState =
  | ({
      phase: "loading";
      answers: AnswerInput[];
    } & Partial<AssessmentInProgressPayload>)
  | ({
      phase: "question";
      answers: AnswerInput[];
    } & AssessmentInProgressPayload)
  | {
      phase: "complete";
      answers: AnswerInput[];
      result: AptiResult;
    }
  | {
      phase: "error";
      answers: AnswerInput[];
      message: string;
    };

export const SOULTRACE_ARCHETYPE_KEYS: SoultraceArchetypeKey[] = [
  "white",
  "blue",
  "black",
  "red",
  "green",
  "white-blue",
  "white-black",
  "white-red",
  "white-green",
  "blue-white",
  "blue-black",
  "blue-red",
  "blue-green",
  "black-white",
  "black-blue",
  "black-red",
  "black-green",
  "red-white",
  "red-blue",
  "red-black",
  "red-green",
  "green-white",
  "green-blue",
  "green-black",
  "green-red",
];

export const SOULTRACE_COLORS: SoultraceColor[] = [
  "white",
  "blue",
  "black",
  "red",
  "green",
];
