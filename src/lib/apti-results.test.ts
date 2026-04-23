import {
  ensureAllArchetypesAreMapped,
  getAptiDefinition,
  resolveAptiResult,
} from "@/src/lib/apti-results";
import type { SoultraceCompleteResponse } from "@/src/types/soultrace";

describe("apti result mapping", () => {
  it("covers all 25 SoulTrace archetypes", () => {
    expect(ensureAllArchetypesAreMapped()).toBe(true);
  });

  it("contains pig emperor as a fixed result", () => {
    expect(getAptiDefinition("black-red").title).toBe("猪皇帝");
  });

  it("resolves complete SoulTrace payload into AptiResult", () => {
    const payload: SoultraceCompleteResponse = {
      status: "complete",
      resultId: "result-1",
      resultUrl: "https://soultrace.app/en/results/result-1",
      distribution: {
        white: 0.1,
        blue: 0.15,
        black: 0.34,
        red: 0.31,
        green: 0.1,
      },
      entropy: 1.88,
      archetype: {
        key: "black-red",
        name: "Vanguard",
        alignmentScore: 91.2,
        strengths: ["Bold"],
        weaknesses: ["Impatient"],
      },
      topMatches: [
        { key: "black-red", name: "Vanguard", alignmentScore: 91.2 },
        { key: "red-black", name: "Conqueror", alignmentScore: 86.4 },
        { key: "black", name: "Maverick", alignmentScore: 80.1 },
      ],
      shadowColors: [
        { color: "white", score: 0.1 },
        { color: "green", score: 0.1 },
      ],
      progress: {
        answered: 24,
        total: 24,
      },
    };

    const result = resolveAptiResult("black-red", payload);

    expect(result.title).toBe("猪皇帝");
    expect(result.imagePath).toBe("/illustrations/pig-emperor.svg");
    expect(result.topMatches[1].aptiTitle).toBe("狮子总攻官");
  });
});
