import { POST } from "@/app/api/assessment/start/route";

describe("POST /api/assessment/start", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("returns localized question payload", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: "in_progress",
        question: {
          id: 3,
          text: "To reach a major goal, I am willing to take calculated risks instead of playing it safe.",
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
    } as Response);

    const response = await POST();
    const payload = (await response.json()) as {
      status: string;
      question: { text: string; originalText: string; localizationMode: string };
    };

    expect(response.status).toBe(200);
    expect(payload.status).toBe("in_progress");
    expect(payload.question.localizationMode).toBe("curated");
    expect(payload.question.text).toContain("机会摆在你面前");
    expect(payload.question.text).not.toContain("如果你是一只");
    expect(payload.question.originalText).toContain("calculated risks");
  });
});
