import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AssessmentShell } from "@/src/components/assessment-shell";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("AssessmentShell", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    pushMock.mockReset();
    window.localStorage.clear();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("starts assessment and routes to result after completion", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: "in_progress",
          question: {
            id: 3,
            text: "一个回报很大、但有点风险的机会摆在你面前时，只要你觉得账算得过来，通常愿意上桌，而不是稳稳躲开。",
            originalText:
              "To reach a major goal, I am willing to take calculated risks instead of playing it safe.",
            localizationMode: "curated",
          },
          currentDistribution: {
            white: 0.2,
            blue: 0.2,
            black: 0.2,
            red: 0.2,
            green: 0.2,
          },
          entropy: 2.3,
          progress: {
            answered: 0,
            total: 24,
          },
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          status: "complete",
          result: {
            archetypeKey: "black-red",
            archetypeName: "Vanguard",
            aptiSlug: "pig-emperor",
            animal: "猪",
            profession: "皇帝",
            title: "猪皇帝",
            tagline: "tagline",
            shortSummary: "summary",
            longSummary: "long summary",
            strengths: ["气场强"],
            riskPoints: ["用力过猛"],
            recommendation: "适当听人说话。",
            imagePath: "/illustrations/pig-emperor.svg",
            emoji: "🐷",
            badgeEmoji: "👑",
            distribution: {
              white: 0.1,
              blue: 0.1,
              black: 0.35,
              red: 0.35,
              green: 0.1,
            },
            entropy: 1.8,
            shadowColors: [
              { color: "white", score: 0.1 },
              { color: "green", score: 0.1 },
            ],
            topMatches: [
              { key: "black-red", name: "Vanguard", alignmentScore: 90, aptiTitle: "猪皇帝" },
            ],
            resultId: "result-1",
            resultUrl: "https://soultrace.app/en/results/result-1",
          },
        }),
      });

    render(<AssessmentShell />);

    await screen.findByText(/一个回报很大、但有点风险的机会摆在你面前时/);
    fireEvent.click(screen.getByText("同意").closest("button") as HTMLButtonElement);
    fireEvent.click(screen.getByRole("button", { name: "提交答案" }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/result");
    });

    expect(window.localStorage.getItem("apti-latest-result")).toContain("猪皇帝");
  });
});
