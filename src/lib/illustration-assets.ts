import illustrationManifest from "@/src/lib/illustration-manifest.json";

export type IllustrationMode = "ai" | "svg-fallback";

export type IllustrationBatch = {
  id: string;
  label: string;
  slugs: string[];
};

const AVAILABLE_AI_ILLUSTRATIONS = new Set<string>(
  illustrationManifest.availableAiIllustrations,
);

export const AI_ILLUSTRATION_FORMAT = illustrationManifest.format;
export const AI_ILLUSTRATION_BASE_PATH = illustrationManifest.basePath;

export const ILLUSTRATION_STYLE_GUIDE = {
  direction: "手绘童话怪趣",
  subjectRule: "动物拟人 + 职业道具 + 夸张表情 + 明确角色动作",
  moodRule: "轻荒诞、鲜艳、像童话书里突然开始上班的动物",
  avoid: [
    "企业宣传画风",
    "写实人像",
    "过度暗黑恐怖",
    "纯平图标感",
  ],
};

export const ILLUSTRATION_BATCHES: IllustrationBatch[] =
  illustrationManifest.batches;

export function getIllustrationAsset(slug: string) {
  if (AVAILABLE_AI_ILLUSTRATIONS.has(slug)) {
    return {
      path: `${AI_ILLUSTRATION_BASE_PATH}/${slug}.${AI_ILLUSTRATION_FORMAT}`,
      mode: "ai" as const satisfies IllustrationMode,
    };
  }

  return {
    path: `/illustrations/${slug}.svg`,
    mode: "svg-fallback" as const satisfies IllustrationMode,
  };
}

export function hasAiIllustration(slug: string) {
  return AVAILABLE_AI_ILLUSTRATIONS.has(slug);
}

export function getAvailableAiIllustrationSlugs() {
  return [...AVAILABLE_AI_ILLUSTRATIONS];
}
