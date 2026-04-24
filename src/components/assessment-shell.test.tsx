import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AssessmentShell } from "@/src/components/assessment-shell";

const pushMock = vi.fn();
const scrollIntoViewMock = vi.fn();
const focusMock = vi.fn();
const matchMediaMock = vi.fn().mockImplementation(() => ({
  matches: false,
  media: "(prefers-reduced-motion: reduce)",
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("AssessmentShell", () => {
  const originalFetch = global.fetch;
  const originalMatchMedia = window.matchMedia;
  const originalScrollIntoView = Element.prototype.scrollIntoView;
  const originalFocus = HTMLElement.prototype.focus;

  beforeEach(() => {
    pushMock.mockReset();
    scrollIntoViewMock.mockReset();
    focusMock.mockReset();
    window.localStorage.clear();
    window.matchMedia = matchMediaMock;
    Element.prototype.scrollIntoView = scrollIntoViewMock;
    HTMLElement.prototype.focus = focusMock;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    window.matchMedia = originalMatchMedia;
    Element.prototype.scrollIntoView = originalScrollIntoView;
    HTMLElement.prototype.focus = originalFocus;
  });

  it("does not scroll on initial question load but scrolls to the next question after submit", async () => {
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
          status: "in_progress",
          question: {
            id: 31,
            text: "越是高压、节奏快、风险大的场面，你越容易觉得自己反而醒了，比风平浪静时更有状态。",
            originalText:
              "I'm energized by high-stakes, high-pressure situations more than calm, predictable ones.",
            localizationMode: "curated",
          },
          currentDistribution: {
            white: 0.18,
            blue: 0.17,
            black: 0.24,
            red: 0.23,
            green: 0.18,
          },
          entropy: 2.12,
          progress: {
            answered: 1,
            total: 24,
          },
        }),
      });

    render(<AssessmentShell />);

    await screen.findByText(/一个回报很大、但有点风险的机会摆在你面前时/);
    expect(scrollIntoViewMock).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText("同意").closest("button") as HTMLButtonElement);
    fireEvent.click(screen.getByRole("button", { name: "提交答案" }));

    await screen.findByText(/越是高压、节奏快、风险大的场面/);

    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });

    expect(focusMock).toHaveBeenCalledWith({ preventScroll: true });
    expect(pushMock).not.toHaveBeenCalled();
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

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
    expect(window.localStorage.getItem("apti-latest-result")).toContain("猪皇帝");
  });
});
