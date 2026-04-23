import {
  getCuratedQuestionCount,
  getCuratedQuestionIds,
  hasCuratedQuestion,
  localizeSoultraceQuestion,
} from "@/src/lib/question-localization";

describe("question localization", () => {
  it("returns curated scenario copy for known questions", () => {
    const question = localizeSoultraceQuestion({
      id: 3,
      text: "To reach a major goal, I am willing to take calculated risks instead of playing it safe.",
    });

    expect(hasCuratedQuestion(3)).toBe(true);
    expect(question.localizationMode).toBe("curated");
    expect(question.text).toContain("机会摆在你面前");
    expect(question.text).not.toContain("如果你是一只");
    expect(question.originalText).toContain("calculated risks");
  });

  it("falls back gracefully for unknown questions", () => {
    const question = localizeSoultraceQuestion({
      id: 9999,
      text: "Unknown question sample.",
    });

    expect(question.localizationMode).toBe("fallback");
    expect(question.text).toContain("中文情景版");
    expect(question.text).not.toContain("如果你是一只");
    expect(question.originalText).toBe("Unknown question sample.");
  });

  it("exposes curated coverage helpers for test and maintenance", () => {
    expect(getCuratedQuestionCount()).toBeGreaterThanOrEqual(37);
    expect(getCuratedQuestionIds()).toEqual(
      expect.arrayContaining([0, 3, 30, 31, 66, 79]),
    );
  });
});
