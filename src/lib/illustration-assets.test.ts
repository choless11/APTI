import {
  AI_ILLUSTRATION_BASE_PATH,
  AI_ILLUSTRATION_FORMAT,
  getAvailableAiIllustrationSlugs,
  getIllustrationAsset,
  hasAiIllustration,
  ILLUSTRATION_BATCHES,
} from "@/src/lib/illustration-assets";

describe("illustration assets", () => {
  it("falls back to svg when ai illustration is not available", () => {
    const asset = getIllustrationAsset("pig-emperor");

    expect(hasAiIllustration("pig-emperor")).toBe(false);
    expect(asset.mode).toBe("svg-fallback");
    expect(asset.path).toBe("/illustrations/pig-emperor.svg");
  });

  it("keeps the first batch list for future ai rollout", () => {
    expect(ILLUSTRATION_BATCHES[0]?.slugs).toContain("pig-emperor");
    expect(ILLUSTRATION_BATCHES[0]?.slugs).toContain("cat-inventor");
  });

  it("exposes the formal ai illustration manifest contract", () => {
    expect(AI_ILLUSTRATION_FORMAT).toBe("webp");
    expect(AI_ILLUSTRATION_BASE_PATH).toBe("/illustrations/ai");
    expect(getAvailableAiIllustrationSlugs()).toEqual([]);
  });
});
