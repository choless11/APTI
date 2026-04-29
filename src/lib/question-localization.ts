import type {
  SoultraceApiQuestion,
  SoultraceQuestion,
} from "@/src/types/soultrace";

type CuratedQuestionEntry = {
  id: number;
  text: string;
};

const CURATED_QUESTION_ENTRIES: CuratedQuestionEntry[] = [
  {
    id: 0,
    text: "碰到一个变量很多、后果也不小的决定时，你通常会先把思路和步骤排清楚，再做判断，而不是凭直觉先拍板。",
  },
  {
    id: 1,
    text: "在群体中，我更愿意在一旁默默出力，而不是成为众人关注的焦点。",
  },
  {
    id: 2,
    text: "当一套老规矩虽然不够时髦，但确实让事情有条不紊地运转时，你通常会觉得先别急着把它整套推翻。",
  },
  {
    id: 3,
    text: "一个回报很大、但有点风险的机会摆在你面前时，只要你觉得账算得过来，通常愿意上桌，而不是稳稳躲开。",
  },
  {
    id: 7,
    text: "遇到明显不轻松的任务时，你反而容易有点来劲，因为你会想顺便看看自己到底能做到什么程度。",
  },
  {
    id: 8,
    text: "在一个大家都能自由发言的场合里，比起“想说什么就说什么”，你更在意现场是不是体面、平和、讲基本分寸。",
  },
  {
    id: 9,
    text: "东西坏了的时候，我想弄明白它为什么会坏，而不只是修好它。",
  },
  {
    id: 10,
    text: "我愿意为了正义而打破常规",
  },
  {
    id: 11,
    text: "如果一个项目连流程、节奏和预期都写得清清楚楚，你通常会比在一团迷雾里临场摸索更能发挥。",
  },
  {
    id: 12,
    text: "为了那个挂在远处的大目标，你常常愿意把眼下的小舒适先往后放一放。",
  },
  {
    id: 14,
    text: "比起把一个旧作品反复打磨到发亮，你通常更容易被“要不再开个新坑”这种念头勾走。",
  },
  {
    id: 16,
    text: "看到身边的人明显撑不住时，你第一反应往往是递办法、给方案，而不是先陪着对方一起消化情绪。",
  },
  {
    id: 17,
    text: "每次新趋势一冒头，你通常不会立刻跟风，而是更想先看看老办法是不是其实还挺能打。",
  },
  {
    id: 18,
    text: "如果一定要二选一，你更希望别人是因为你真的有本事而尊重你，而不是只觉得你这个人讨喜。",
  },
  {
    id: 19,
    text: "哪怕见过不少离谱场面，你通常还是会倾向相信，大多数人本质上不坏，只是偶尔会做出糟糕选择。",
  },
  {
    id: 21,
    text: "一看到复杂问题、谜题或者结构精巧的难关，你往往比去认识一屋子新人更容易起精神。",
  },
  {
    id: 22,
    text: "就算你大体赞同权威人物的观点，脑子里通常也还是会先冒出一句：等一下，这真的对吗？",
  },
  {
    id: 23,
    text: "相比谈论日常琐事，我更喜欢探讨抽象概念的交流。",
  },
  {
    id: 24,
    text: "如果一件很重要的事最后搞砸了，你通常会先坐下来复盘哪里出问题，而不是第一时间去找安慰。",
  },
  {
    id: 25,
    text: "做项目时，比起让大家享受过程，我更在意把结果做到最好，这更能激励我。",
  },
  {
    id: 26,
    text: "在一份很稳但没什么挑战的工作，和一份能逼你长本事的岗位之间，你大概率会选后者。",
  },
  {
    id: 27,
    text: "我常常会沉浸在琢磨某个东西到底是怎么运作的里，就算其实根本没必要这么做。",
  },
  {
    id: 28,
    text: "我不介意交谈时出现沉默，也不会刻意去填补每一段谈话的留白。",
  },
  {
    id: 29,
    text: "一套流程如果已经跑得挺顺，你通常不太愿意改它，哪怕有人已经被这个流程磨得有点难受。",
  },
  {
    id: 30,
    text: "跟一个人接触不久时，你往往会根据对方当下的做事方式和待人举动，很快在心里形成一个大致判断。",
  },
  {
    id: 31,
    text: "越是高压、节奏快、风险大的场面，你越容易觉得自己反而醒了，比风平浪静时更有状态。",
  },
  {
    id: 32,
    text: "遇到必须说的难听真话时，你通常宁愿直接说清楚，也不太愿意为了照顾感受把它包得太软。",
  },
  {
    id: 33,
    text: "明确的认可、奖项、成绩或者外部反馈，往往真的能把你的干劲一下子提起来。",
  },
  {
    id: 34,
    text: "做决定时，你通常更愿意抓住一套稳定原则，而不是每次都完全按眼前情况临时改口径。",
  },
  {
    id: 35,
    text: "如果一个老机构和一个来势汹汹的新挑战者正面对上，你通常会更倾向先站在现有体系那一边。",
  },
  {
    id: 37,
    text: "我认为，维护团队和谐，比满足自己的个人需求更重要。",
  },
  {
    id: 39,
    text: "有些问题，靠直觉解决比靠分析更有效。",
  },
  {
    id: 40,
    text: "你喜欢做一些没什么实际目的、纯粹图开心的事",
  },
  {
    id: 42,
    text: "我经常会突然对各种莫名其妙的话题感兴趣，还会毫无目的地花时间去研究。",
  },
  {
    id: 45,
    text: "如果没有人给你定节奏、排安排、划边界，你反而可能有点飘；比起完全自由，你其实更吃清楚的外部结构。",
  },
  {
    id: 46,
    text: "面对坏消息时，我会专注于仍能向好发展的事，而非纠结于已然发生的过错。",
  },
  {
    id: 47,
    text: "当别人反对我的的想法和观念，总爱先自我怀疑、反复琢磨，而不是急着去辩护。",
  },
  {
    id: 48,
    text: "很多时候，真正驱动你的不是“冲个巨大成功”，而是“这事千万别翻车”。",
  },
  {
    id: 51,
    text: "做决定时，你有时会更跟着当下的感觉走，而不是立刻把未来后果一项项列出来计算。",
  },
  {
    id: 53,
    text: "局面一乱、节奏一快、所有人都开始紧张时，你反而容易觉得自己整个人更清醒、更有活力。",
  },
  {
    id: 54,
    text: "即使一屋子人都已经点头了，只要你觉得不对劲，通常还是会把那句反对意见说出口。",
  },
  {
    id: 55,
    text: "只要你对一个议题认真起来，通常会先把资料翻到很深，再决定自己到底站哪边。",
  },
  {
    id: 58,
    text: "一个人就算再温和、再好相处，只要能力明显不在线，你通常也很难发自内心地佩服。",
  },
  {
    id: 61,
    text: "一旦对某件新鲜事产生兴趣，你通常不是浅尝两口，而是会一头扎进去快速学深。",
  },
  {
    id: 62,
    text: "即便他人一言不发，我也能敏锐察觉到他们情绪上的变化。",
  },
  {
    id: 63,
    text: "当别人给我建议时，我的第一反应就是去想那些不适用该建议的例外情况。",
  },
  {
    id: 64,
    text: "如果让你自由选聊天内容，你通常更享受聊真实生活里的小事和见闻，而不是一上来就讨论宏大命题。",
  },
  {
    id: 66,
    text: "只要你看见一个系统、流程或安排明显低效，通常很难假装没看见，手就会有点想上去改。",
  },
  {
    id: 69,
    text: "要是一件事我摸不透背后的门道，我就浑身不自在。",
  },
  {
    id: 70,
    text: "即便我内心赞同大多数人的观点，也常常会故意唱反调、提出不同看法。",
  },
  {
    id: 72,
    text: "就算变化有可能带来提升，只要它会把原本稳定的东西搅得太厉害，你通常还是会先偏向稳一点。",
  },
  {
    id: 73,
    text: "我发现自己很爱担任指导或培养他人的角色，即便只是非正式的场合。",
  },
  {
    id: 74,
    text: "只要某个位置能让你拥有更多影响力和决定权，你通常不会假装无所谓，而是真的会去争取。",
  },
  {
    id: 75,
    text: "在很多全靠表情、停顿、语气和空气流动的聊天里，你可能会比别人慢半拍才意识到潜台词。",
  },
  {
    id: 76,
    text: "有截止日期时，我的工作效率会更高。",
  },
  {
    id: 78,
    text: "我发现，身处大自然比参加社交活动更能让我恢复精力。",
  },
  {
    id: 79,
    text: "只要最后结果足够好，你有时会更容易接受过程里那些不算特别体面的手段。",
  },
];

const CURATED_QUESTION_MAP = Object.fromEntries(
  CURATED_QUESTION_ENTRIES.map((entry) => [entry.id, entry.text]),
) as Record<number, string>;

const missingQuestionLog = new Set<number>();

function buildFallbackText() {
  return "这道题暂时还没整理成中文情景版。你可以先看下面的英文原句，再按自己平时最真实的反应作答。";
}

function recordMissingQuestion(question: SoultraceApiQuestion) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  if (missingQuestionLog.has(question.id)) {
    return;
  }

  missingQuestionLog.add(question.id);
  console.warn(
    `[apti] Missing localized SoulTrace question ${question.id}: ${question.text}`,
  );
}

export function localizeSoultraceQuestion(
  question: SoultraceApiQuestion,
): SoultraceQuestion {
  const curatedText = CURATED_QUESTION_MAP[question.id];

  if (curatedText) {
    return {
      id: question.id,
      text: curatedText,
      originalText: question.text,
      localizationMode: "curated",
    };
  }

  recordMissingQuestion(question);

  return {
    id: question.id,
    text: buildFallbackText(),
    originalText: question.text,
    localizationMode: "fallback",
  };
}

export function hasCuratedQuestion(questionId: number) {
  return Boolean(CURATED_QUESTION_MAP[questionId]);
}

export function getCuratedQuestionCount() {
  return CURATED_QUESTION_ENTRIES.length;
}

export function getCuratedQuestionIds() {
  return CURATED_QUESTION_ENTRIES.map((entry) => entry.id);
}
