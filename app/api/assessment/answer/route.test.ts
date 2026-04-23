import { POST } from "@/app/api/assessment/answer/route";

describe("POST /api/assessment/answer", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
    delete process.env.SOULTRACE_MOCK_MODE;
  });

  it("returns mapped apti result when SoulTrace finishes", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: "complete",
        resultId: "result-1",
        resultUrl: "https://soultrace.app/en/results/result-1",
        distribution: {
          white: 0.12,
          blue: 0.14,
          black: 0.35,
          red: 0.29,
          green: 0.1,
        },
        entropy: 1.77,
        archetype: {
          key: "black-red",
          name: "Vanguard",
          alignmentScore: 90.1,
        },
        topMatches: [
          { key: "black-red", name: "Vanguard", alignmentScore: 90.1 },
          { key: "red-black", name: "Conqueror", alignmentScore: 84.8 },
          { key: "black", name: "Maverick", alignmentScore: 79.9 },
        ],
        shadowColors: [
          { color: "green", score: 0.1 },
          { color: "white", score: 0.12 },
        ],
        progress: {
          answered: 24,
          total: 24,
        },
      }),
    } as Response);

    const request = new Request("http://localhost/api/assessment/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers: [{ questionId: 1, score: 7 }],
      }),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      status: string;
      result: { title: string };
    };

    expect(response.status).toBe(200);
    expect(payload.status).toBe("complete");
    expect(payload.result.title).toBe("猪皇帝");
  });

  it("returns localized question while the assessment is still in progress", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        status: "in_progress",
        question: {
          id: 31,
          text: "I'm energized by high-stakes, high-pressure situations more than calm, predictable ones.",
        },
        currentDistribution: {
          white: 0.2,
          blue: 0.2,
          black: 0.2,
          red: 0.2,
          green: 0.2,
        },
        entropy: 2.18,
        progress: {
          answered: 1,
          total: 24,
        },
      }),
    } as Response);

    const request = new Request("http://localhost/api/assessment/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers: [{ questionId: 3, score: 6 }],
      }),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      status: string;
      question: { localizationMode: string; text: string; originalText: string };
    };

    expect(response.status).toBe(200);
    expect(payload.status).toBe("in_progress");
    expect(payload.question.localizationMode).toBe("curated");
    expect(payload.question.text).toContain("高压");
    expect(payload.question.text).not.toContain("如果你是一只");
    expect(payload.question.originalText).toContain("high-stakes");
  });

  it("returns translated error when SoulTrace is rate limited", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      json: async () => ({}),
    } as Response);

    const request = new Request("http://localhost/api/assessment/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answers: [{ questionId: 1, score: 6 }],
      }),
    });

    const response = await POST(request);
    const payload = (await response.json()) as { message: string };

    expect(response.status).toBe(429);
    expect(payload.message).toContain("限流");
  });
});
