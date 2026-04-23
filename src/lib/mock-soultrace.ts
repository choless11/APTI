import {
  SOULTRACE_ARCHETYPE_KEYS,
  SOULTRACE_COLORS,
  type AnswerInput,
  type SoultraceApiResponse,
  type SoultraceApiQuestion,
  type SoultraceArchetypeKey,
  type SoultraceColor,
  type SoultraceDistribution,
} from "@/src/types/soultrace";

const MOCK_QUESTIONS: SoultraceApiQuestion[] = [
  {
    id: 3,
    text: "To reach a major goal, I am willing to take calculated risks instead of playing it safe.",
  },
  {
    id: 0,
    text: "When faced with a complex decision, I prioritize a methodical approach over intuitive leaps.",
  },
  {
    id: 7,
    text: "I seek out difficult tasks because I want to test what I'm capable of.",
  },
  {
    id: 19,
    text: "I believe that most people are fundamentally good, even when they make poor choices.",
  },
  {
    id: 66,
    text: "I notice when systems or processes are inefficient and feel compelled to improve them.",
  },
  {
    id: 21,
    text: "I'm more energized by solving puzzles than by connecting with people.",
  },
  {
    id: 74,
    text: "I actively seek positions of influence and authority.",
  },
  {
    id: 55,
    text: "I tend to research a topic exhaustively before forming an opinion about it.",
  },
  {
    id: 54,
    text: "When I disagree with a group consensus, I usually voice my objection.",
  },
  {
    id: 31,
    text: "I'm energized by high-stakes, high-pressure situations more than calm, predictable ones.",
  },
  {
    id: 48,
    text: "I'm more motivated by preventing a bad outcome than by achieving a great one.",
  },
  {
    id: 72,
    text: "I prefer stability over change, even if change might bring improvements.",
  },
  {
    id: 12,
    text: "I often prioritize ambitious long-term goals over enjoying the present moment.",
  },
  {
    id: 64,
    text: "I enjoy casual conversations about everyday life more than deep philosophical discussions.",
  },
  {
    id: 75,
    text: "I often miss social cues and nonverbal signals in conversations.",
  },
  {
    id: 26,
    text: "I would choose a job that challenges my abilities over one that guarantees security.",
  },
  {
    id: 18,
    text: "I would rather be respected for my competence than loved for my personality.",
  },
  {
    id: 14,
    text: "I'd rather start something new than perfect something I've already done.",
  },
  {
    id: 79,
    text: "Achieving a good outcome justifies using questionable methods.",
  },
  {
    id: 32,
    text: "I'd rather give someone a harsh truth directly than soften it to spare their feelings.",
  },
  {
    id: 29,
    text: "When a process works well, I'm reluctant to change it even if some people find it uncomfortable.",
  },
  {
    id: 53,
    text: "I feel more alive during a crisis than during periods of calm stability.",
  },
  {
    id: 58,
    text: "I find it difficult to respect someone who lacks competence, regardless of their kindness.",
  },
  {
    id: 2,
    text: "I believe that established societal structures and traditions provide essential stability.",
  },
];

const MOCK_ARCHETYPE_NAMES: Record<SoultraceArchetypeKey, string> = {
  white: "Anchor",
  blue: "Rationalist",
  black: "Maverick",
  red: "Spark",
  green: "Weaver",
  "white-blue": "Arbiter",
  "white-black": "Custodian",
  "white-red": "Herald",
  "white-green": "Warden",
  "blue-white": "Magistrate",
  "blue-black": "Strategist",
  "blue-red": "Sparkmind",
  "blue-green": "Oracle",
  "black-white": "Enforcer",
  "black-blue": "Operator",
  "black-red": "Vanguard",
  "black-green": "Founder",
  "red-white": "Crusader",
  "red-blue": "Innovator",
  "red-black": "Conqueror",
  "red-green": "Freeborn",
  "green-white": "Shepherd",
  "green-blue": "Northstar",
  "green-black": "Coordinator",
  "green-red": "Wanderer",
};

function createBaseDistribution(): SoultraceDistribution {
  return {
    white: 0.2,
    blue: 0.2,
    black: 0.2,
    red: 0.2,
    green: 0.2,
  };
}

function clampDistribution(distribution: SoultraceDistribution) {
  const total = SOULTRACE_COLORS.reduce(
    (sum, color) => sum + distribution[color],
    0,
  );

  return SOULTRACE_COLORS.reduce(
    (result, color) => {
      result[color] = Number((distribution[color] / total).toFixed(4));
      return result;
    },
    {} as SoultraceDistribution,
  );
}

function getArchetypeKey(distribution: SoultraceDistribution): SoultraceArchetypeKey {
  const rankedColors = [...SOULTRACE_COLORS].sort(
    (left, right) => distribution[right] - distribution[left],
  );
  const [primary, secondary] = rankedColors;

  if (distribution[primary] - distribution[secondary] < 0.05) {
    return `${primary}-${secondary}` as SoultraceArchetypeKey;
  }

  return primary;
}

function buildDistribution(answers: AnswerInput[]) {
  const distribution = createBaseDistribution();

  answers.forEach((answer, index) => {
    const weight = (answer.score - 4) / 18;
    const primaryColor = SOULTRACE_COLORS[index % SOULTRACE_COLORS.length];
    const secondaryColor =
      SOULTRACE_COLORS[(index + 2) % SOULTRACE_COLORS.length];

    distribution[primaryColor] += Math.max(weight, -0.02) + 0.05;
    distribution[secondaryColor] += Math.max(weight / 2, -0.01) + 0.02;
  });

  return clampDistribution(distribution);
}

function buildTopMatches(distribution: SoultraceDistribution) {
  return SOULTRACE_ARCHETYPE_KEYS.map((key) => {
    const parts = key.split("-") as SoultraceColor[];
    const score =
      parts.length === 1
        ? distribution[parts[0]] * 100
        : ((distribution[parts[0]] + distribution[parts[1]]) / 2) * 100;

    return {
      key,
      name: MOCK_ARCHETYPE_NAMES[key],
      alignmentScore: Number(score.toFixed(1)),
    };
  })
    .sort((left, right) => right.alignmentScore - left.alignmentScore)
    .slice(0, 3);
}

function buildShadowColors(distribution: SoultraceDistribution) {
  return [...SOULTRACE_COLORS]
    .sort((left, right) => distribution[left] - distribution[right])
    .slice(0, 2)
    .map((color) => ({
      color,
      score: Number(distribution[color].toFixed(4)),
    }));
}

export function getMockSoultraceResponse(
  answers: AnswerInput[],
): SoultraceApiResponse {
  const answered = answers.length;
  const total = MOCK_QUESTIONS.length;
  const distribution = buildDistribution(answers);

  if (answered < total) {
    return {
      status: "in_progress",
      question: MOCK_QUESTIONS[answered],
      currentDistribution: distribution,
      entropy: Number((2.2 - answered * 0.02).toFixed(3)),
      progress: {
        answered,
        total,
      },
    };
  }

  const archetypeKey = getArchetypeKey(distribution);
  const topMatches = buildTopMatches(distribution);

  return {
    status: "complete",
    resultId: "mock-result",
    resultUrl: "https://soultrace.app",
    distribution,
    entropy: 1.782,
    archetype: {
      key: archetypeKey,
      name: MOCK_ARCHETYPE_NAMES[archetypeKey],
      alignmentScore: topMatches[0]?.alignmentScore ?? 80,
      coreDynamic: "Mock mode result",
      strengths: ["稳定输出", "自我驱动"],
      weaknesses: ["容易过度用力"],
    },
    topMatches,
    shadowColors: buildShadowColors(distribution),
    progress: {
      answered,
      total,
    },
  };
}
