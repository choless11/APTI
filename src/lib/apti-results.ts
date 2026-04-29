import { getIllustrationAsset } from "@/src/lib/illustration-assets";
import {
  SOULTRACE_ARCHETYPE_KEYS,
  type AptiMappedMatch,
  type AptiResult,
  type SoultraceArchetypeKey,
  type SoultraceColor,
  type SoultraceCompleteResponse,
  type SoultraceDistribution,
  type SoultraceTopMatch,
} from "@/src/types/soultrace";

type AptiResultDefinition = {
  slug: string;
  animal: string;
  profession: string;
  title: string;
  tagline: string;
  shortSummary: string;
  longSummary: string;
  strengths: string[];
  riskPoints: string[];
  recommendation: string;
  emoji: string;
  badgeEmoji: string;
};

function defineResult(definition: AptiResultDefinition) {
  return definition;
}

export const COLOR_LABELS: Record<SoultraceColor, string> = {
  white: "白",
  blue: "蓝",
  black: "黑",
  red: "红",
  green: "绿",
};

const SOULTRACE_ARCHETYPE_NAMES: Record<SoultraceArchetypeKey, string> = {
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

const APTI_RESULT_DEFINITIONS: Record<
  SoultraceArchetypeKey,
  AptiResultDefinition
> = {
  white: defineResult({
    slug: "river-beaver-archivist",
    animal: "河狸",
    profession: "档案官",
    title: "河狸档案官",
    tagline: "你不是在整理世界，你是在给世界贴标签、盖章、归档，然后顺手拯救它。",
    shortSummary: "你擅长把一锅乱炖收拾成像样套餐，让人一看就想把任务交给你。",
    longSummary:
      "河狸档案官像那种会在别人还没意识到局面失控之前，已经默默把流程、边界和说明书都补齐的人。你重视秩序、公平和靠谱，不爱瞎冲，但会用稳定的方式把整个局面拎回正轨。",
    strengths: [
      "混乱一冒头，你就能先把优先级、责任人和截止线钉住，让大家从满地找头变成按格子推进。",
      "你很会把隐形规则讲成明白话，别人听完不一定热血沸腾，但通常知道下一步该怎么走。",
      "你身上的靠谱感很能镇场，像会议室里突然出现了一本会说人话的操作手册。",
    ],
    riskPoints: [
      "别人一露出手忙脚乱的表情，你就容易自动接管，最后变成全世界都在轻装上阵，只有你背着仓库跑。",
      "局面需要一点弹性和试错时，你可能会先忙着加栏杆，把原本能长出来的新东西修剪得过早。",
    ],
    recommendation:
      "别什么都亲自封箱编号。先分清哪些东西必须进档案室，哪些可以暂时放在草地上晒太阳，世界不会因为少一个标签就立刻散架。",
    emoji: "🦫",
    badgeEmoji: "🗂️",
  }),
  blue: defineResult({
    slug: "octopus-researcher",
    animal: "章鱼",
    profession: "研究员",
    title: "章鱼研究员",
    tagline: "你一边拆系统，一边伸出八只手去把答案从海底摸回来。",
    shortSummary: "你对“搞懂它”这件事真的很上头，复杂反而会让你来电。",
    longSummary:
      "章鱼研究员不是为了显得聪明才分析，而是真的会被复杂系统勾走魂。你擅长抽丝剥茧、总结规律、把混乱问题拆成可理解的部件，所以常常在别人只看到麻烦时，你已经看到结构。",
    strengths: [
      "你能把一团缠在一起的问题拆成几层结构，别人看见海草打结，你已经摸到下面那块石头。",
      "你脑内模型很多，遇到新领域不会只背结论，而是会努力搞清它到底靠什么运转。",
      "复杂不会把你吓退，反而像给你打开了新的水族箱，让你忍不住伸手进去研究。",
    ],
    riskPoints: [
      "答案已经够用了，你还想再查三篇资料、搭两个框架，最后把出发时间拖成研究生开题。",
      "需要先试一版的时候，你容易继续在脑内模拟，把执行现场变成一篇还没写完的论文。",
    ],
    recommendation:
      "当你已经懂到七成时，就可以先伸出一只触手去做了。剩下三成让真实世界回传数据，比在脑内反复演算更快。",
    emoji: "🐙",
    badgeEmoji: "🔬",
  }),
  black: defineResult({
    slug: "cheetah-boss",
    animal: "猎豹",
    profession: "老板",
    title: "猎豹老板",
    tagline: "你的默认状态不是散步，是盯着目标一路压低身位准备开冲。",
    shortSummary: "你喜欢结果、速度和主动权，不太爱在原地开无穷无尽的会。",
    longSummary:
      "猎豹老板通常不是最会安抚气氛的人，但很常是最先把事情推起来的人。你对机会、效率和胜负感很敏锐，一旦决定出手，就希望节奏掌握在自己爪子里。",
    strengths: [
      "机会窗口一开，你很少在原地围观，通常能先压低身位、找准路线，把事情真的推起来。",
      "你对结果和资源很敏感，能快速判断哪条路有收益，哪条路只是看起来很热闹。",
      "关键时刻你敢拍板，不会让一件事在无限讨论里被风干成纪要。",
    ],
    riskPoints: [
      "你急着往目标冲时，语气和动作容易显得太硬，别人还没理解路线就先感到被推着跑。",
      "团队需要消化、补位或建立共识时，你可能低估了跟上成本，觉得大家怎么还没到。",
    ],
    recommendation:
      "把“为什么这么做”和“你需要别人怎么配合”讲出来。速度仍然可以很快，但队友会更愿意跟你一起冲，而不是被你卷起的风带走。",
    emoji: "🐆",
    badgeEmoji: "💼",
  }),
  red: defineResult({
    slug: "flamingo-director",
    animal: "火烈鸟",
    profession: "导演",
    title: "火烈鸟导演",
    tagline: "你不只想活得有戏，你还想把全场灯光调到刚好照在自己喜欢的情绪上。",
    shortSummary: "你靠热度、表达和现场感发电，太无聊的地方会让你灵魂打哈欠。",
    longSummary:
      "火烈鸟导演很会把气氛点亮，也很会把真实情绪直接端上桌。你不爱死板的壳子，宁愿局面鲜活一点、吵一点、真一点，所以你常常像全场最会把‘活人感’拉回来的那只动物。",
    strengths: [
      "你能很快把场子的温度提起来，让原本像表格一样干的讨论突然有了人味和画面。",
      "你表达直接，不太会把真实感包三层塑料袋，别人常能从你这里听到没被稀释的版本。",
      "你行动自带火花，临场感强，适合在僵住的时候把第一盏灯打开。",
    ],
    riskPoints: [
      "情绪一上来，你的启动速度会比刹车系统快，原本只是表达立场，转眼可能变成全场加戏。",
      "现场气氛太刺激时，情绪容易抢方向盘，让真正要解决的问题被灯光和音量盖过去。",
    ],
    recommendation:
      "开演前先深呼吸十秒，再决定这场戏要不要升调。你的直觉很有光，但先给它一个节拍，它会更像神来一笔，而不是临场翻车。",
    emoji: "🦩",
    badgeEmoji: "🎬",
  }),
  green: defineResult({
    slug: "capybara-gardener",
    animal: "水豚",
    profession: "园丁",
    title: "水豚园丁",
    tagline: "你不是慢，你只是拒绝把任何关系养成速成鸡。",
    shortSummary: "你擅长养气氛、养关系、养节奏，也擅长把人慢慢安顿到舒服的位置上。",
    longSummary:
      "水豚园丁身上有一种很稀有的稳定感。你重视连接、耐心和长期生长，不急着抢戏，但会一点点把环境养到更柔软、更可持续。别人常在你这儿感觉终于能把肩膀放下来。",
    strengths: [
      "你很能接住人的不完美，别人带着毛边进来，通常不会立刻被你判出局。",
      "你的耐心不是摆设，能陪一段关系、一个项目或一个人慢慢长出稳定节奏。",
      "你擅长养环境，会让紧绷的地方逐渐松下来，让大家愿意留下来继续生长。",
    ],
    riskPoints: [
      "别人一需要照顾，你就容易往后退半步，退着退着把自己的需求退到地图外。",
      "为了维持和气，你可能把边界说得太轻，等不舒服堆高了才发现草坪已经被踩秃。",
    ],
    recommendation:
      "温柔不等于无限供应。你可以继续当让人安心的水边草地，但也要给自己的边界插上小牌子，记得给自己的草坪也浇点水。",
    emoji: "🐹",
    badgeEmoji: "🪴",
  }),
  "white-blue": defineResult({
    slug: "snowy-owl-auditor",
    animal: "雪鸮",
    profession: "审计官",
    title: "雪鸮审计官",
    tagline: "你既要讲理，还要讲格式，最好顺手把漏洞圈出来。",
    shortSummary: "你喜欢可验证、可复盘、可对齐的东西，含糊其辞会让你眉头打结。",
    longSummary:
      "雪鸮审计官是那种看到结构就会发亮、看到漏洞就会起飞的人。你既要逻辑过关，也要规则清楚，不喜欢‘差不多算了’，因为在你眼里差不多通常就是迟早要炸。",
    strengths: [
      "你对标准和漏洞特别敏感，别人说“差不多”时，你已经听见了远处螺丝松动的声音。",
      "你判断问题不太靠情绪风向，喜欢证据、逻辑和可复盘的链条，所以结论通常站得住。",
      "你很会纠偏，能在局面还没彻底撞墙前指出哪里需要校准。",
    ],
    riskPoints: [
      "面对不够严谨的人时，你容易把审计灯开到最大，别人还没改错就先想逃离办公室。",
      "一处小瑕疵就可能偷走你的快乐，让本来还不错的成果在你眼里只剩红笔批注。",
    ],
    recommendation:
      "不是每只动物都配得上你的一毫米精度。先判断这件事值不值得开全套审计，再决定要用放大镜还是普通眼睛。",
    emoji: "🦉",
    badgeEmoji: "🧾",
  }),
  "white-black": defineResult({
    slug: "bulldog-steward",
    animal: "斗牛犬",
    profession: "总管",
    title: "斗牛犬总管",
    tagline: "你不是嘴上守秩序，你是真的会把门站住、把线拉上、把规矩钉墙上。",
    shortSummary: "你对职责、边界和执行都很认真，认真到有时会自带压迫感。",
    longSummary:
      "斗牛犬总管很少只是说说而已。你既重视规则，也有力气把规则落下来，所以混乱环境里常常需要你这种能扛、能压、能顶住场面的动物。",
    strengths: [
      "压力真的压下来时，你不是只会喊口号，而是能站到门口把责任和边界一起扛住。",
      "你的执行很有落地感，定下来的事不容易飘在空气里，通常会被你钉到墙上。",
      "你底线硬，适合在规则被反复试探时让大家知道这里不是无人看管的仓库。",
    ],
    riskPoints: [
      "局面一乱，你可能会本能地收紧控制，把每个人都按进你认为安全的位置。",
      "你还没来得及解释用意，别人已经先感受到压迫，理解往往慢你半拍才到。",
    ],
    recommendation:
      "在发号施令前先说清你想保护什么。硬度本身不是问题，让大家知道这份硬是为了守门，不是为了显得自己嗓门最大。",
    emoji: "🐶",
    badgeEmoji: "🛡️",
  }),
  "white-red": defineResult({
    slug: "rooster-spokesperson",
    animal: "公鸡",
    profession: "宣讲官",
    title: "公鸡宣讲官",
    tagline: "你的价值观不是藏在心里，是会拿着扩音器在天亮前先喊一遍。",
    shortSummary: "你会把信念讲出来，也会把情绪点起来，存在感很难低调。",
    longSummary:
      "公鸡宣讲官通常不满足于‘我知道就行了’，你更想让正确的事被看见、被听见、被大家真的感受到。你兼具原则感和表达力，所以很适合做点亮群体氛围的角色。",
    strengths: [
      "你很会把信念讲出声，不会让重要的价值观缩在角落里假装自己不存在。",
      "你立场清楚，遇到含糊和退缩时，常能像清晨第一声提醒，把大家叫醒。",
      "你敢发声，也能把情绪和原则一起点起来，让人知道这件事值得认真对待。",
    ],
    riskPoints: [
      "讲到兴头上，你容易把话说得太满，原本是号召，听起来可能像最后通牒。",
      "你想说服大家时，能量会越推越高，别人如果还没准备好，可能先感到被扩音器追着跑。",
    ],
    recommendation:
      "少一点连珠炮，多一点对话感。先确认别人听见了哪一部分，再继续升音量，你的话会更容易落进耳朵里，而不是弹到墙上。",
    emoji: "🐓",
    badgeEmoji: "📣",
  }),
  "white-green": defineResult({
    slug: "deer-restorationist",
    animal: "梅花鹿",
    profession: "修复师",
    title: "梅花鹿修复师",
    tagline: "你天生想把裂开的东西扶正，把慌的人安顿，把乱的场面慢慢缝好。",
    shortSummary: "你既要环境有边界，也要关系有温度，是那种温柔但不糊涂的动物。",
    longSummary:
      "梅花鹿修复师不喜欢粗暴地解决问题。你更擅长观察损伤从哪里开始，再一点点把信任、秩序和安全感缝回去。你的力量不是 loud，而是持久。",
    strengths: [
      "你能看见关系里细小的裂缝，不急着下锤子，而是先判断该扶哪里、缝哪里。",
      "你很会稳定场域，紧张的人到你身边会慢慢找回呼吸，乱成一团的局面也会被你降噪。",
      "你的细腻不等于软弱，温柔里带着边界，像一只知道什么时候靠近、什么时候停步的鹿。",
    ],
    riskPoints: [
      "别人关系一出问题，你容易默默把工具箱背上，最后发现不是所有裂缝都应该由你负责。",
      "冲突时间一长，你的电量会被一点点拖空，因为你总在同时照看秩序、情绪和每个人的体面。",
    ],
    recommendation:
      "不是每个破洞都归你补。先分清责任再动手，把能修的修好，把不该你背的放回原处，你的温柔才有续航。",
    emoji: "🦌",
    badgeEmoji: "🩹",
  }),
  "blue-white": defineResult({
    slug: "dolphin-architect",
    animal: "海豚",
    profession: "架构师",
    title: "海豚架构师",
    tagline: "你看见知识不会只想理解它，你会想顺便给它搭一栋能反复使用的楼。",
    shortSummary: "你擅长把复杂东西变成框架，别人看到信息量，你看到结构骨架。",
    longSummary:
      "海豚架构师天然有建模欲。你喜欢把分散的信息接成系统，把临时办法升级成长期可复用的方案，所以别人常在和你聊完之后突然觉得脑子整齐了。",
    strengths: [
      "你擅长把散乱信息搭成结构，别人还在捞关键词，你已经开始画能长期复用的水下路线图。",
      "你的逻辑线清楚，能把复杂问题讲到别人终于知道自己站在哪一层。",
      "你规划稳，喜欢让方案不只解决今天，还能撑住明天和后天的复用。",
    ],
    riskPoints: [
      "一个小需求刚出现，你可能已经开始设计三层架构，结果把轻便小船造成海上综合体。",
      "看见混乱时你会很想立刻重构，但有些东西其实只需要先补一颗螺丝，不需要重建码头。",
    ],
    recommendation:
      "先让它能跑，再让它优雅。别一上来就给小木屋画高楼图纸，等真实需求站稳了，再把你的架构天赋请上场。",
    emoji: "🐬",
    badgeEmoji: "🏗️",
  }),
  "blue-black": defineResult({
    slug: "raven-chief-strategist",
    animal: "乌鸦",
    profession: "参谋长",
    title: "乌鸦参谋长",
    tagline: "你像会在树枝上眯眼看局势、然后突然精准扔出下一步的人。",
    shortSummary: "你擅长看全局、算节点、挑时机，脑子里常年像在下棋。",
    longSummary:
      "乌鸦参谋长兼具脑力和狠准的行动感。你不爱无意义折腾，但很会借信息差、路径设计和时间判断把事情推到最有利的位置。你赢得通常不吵，但很稳。",
    strengths: [
      "你很会布局，不只看眼前这一步，还会顺手估算它会把局面推到哪个路口。",
      "你的预判强，常能在别人还在看热闹时，先闻到机会、风险和下一张牌的味道。",
      "你不是只会想，执行也跟得上，能把分析落成精准动作，而不是停在树枝上点评天下。",
    ],
    riskPoints: [
      "你容易一次想太多步，脑内棋盘已经下到终局，队友却还在找第一颗棋子。",
      "你把关键判断都藏在心里时，会显得冷或难以靠近，别人可能误会你在暗处操控全场。",
    ],
    recommendation:
      "偶尔把计划书翻开一页给队友看。你不需要交出全部底牌，但让别人看见你的判断依据，信任会跟上你的脑速。",
    emoji: "🐦",
    badgeEmoji: "♟️",
  }),
  "blue-red": defineResult({
    slug: "cat-inventor",
    animal: "猫",
    profession: "发明家",
    title: "猫咪发明家",
    tagline: "你的脑子像一张铺满奇怪零件的桌子，随手一碰就可能拼出新东西。",
    shortSummary: "你对新点子、新玩法和新组合非常来电，而且常常真能做出东西。",
    longSummary:
      "猫咪发明家把好奇心和创造力拧成一台持续运转的小马达。你喜欢边试边想、边玩边学，一旦被某个点子点燃，就很可能在短时间里搞出令人侧目的新组合。",
    strengths: [
      "你的脑洞反应很灵，普通零件到你手里常能被拼出意想不到的新玩法。",
      "你学得快，遇到有趣的机制会迅速上手，一边拆一边试，像在桌面上开小型实验展。",
      "你善于试新，不太害怕把想法拿出来碰碰看，所以常能比别人更早摸到可能性。",
    ],
    riskPoints: [
      "刺激点一多，你的注意力会开始跳窗，手上项目还没收尾，眼睛已经盯上下一只发光玩具。",
      "新鲜感一过，你容易觉得这局没意思了，留下几个很酷但还没拧紧的半成品。",
    ],
    recommendation:
      "先把最想做的点子做成 mini 版。给灵感一个小笼子，不然它会像猫一样一下就跑了，只留下你对着桌面零件发呆。",
    emoji: "🐱",
    badgeEmoji: "⚗️",
  }),
  "blue-green": defineResult({
    slug: "fox-observer",
    animal: "狐狸",
    profession: "观察员",
    title: "狐狸观察员",
    tagline: "你总能在大家还在吵时，安静地看清到底是哪根绳子打了死结。",
    shortSummary: "你既会看结构，也会看人心，判断往往比表态来得更早更准。",
    longSummary:
      "狐狸观察员不是没意见，而是习惯先看透再开口。你对关系、系统和气氛变化都很敏感，所以常常能一针见血地指出关键问题，只是你不喜欢毫无准备的抢麦。",
    strengths: [
      "你洞察很细，能在一堆吵闹里看出真正打结的那根绳子，而不是只被音量带着走。",
      "你判断稳，通常会先观察关系、结构和情绪走向，再给出不太浮夸但很准的结论。",
      "你有同理心，不是冷眼旁观的聪明，而是能同时看见问题和人为什么会卡在那里。",
    ],
    riskPoints: [
      "你表达偏保守，明明已经看穿关键，却可能先缩在角落等一个更完美的开口时机。",
      "别人看不见你脑内的判断过程时，容易把你误判成佛系围观，错过你其实很有价值的提醒。",
    ],
    recommendation:
      "该开口时早一点开口。别总等到剧情播完才放彩蛋，你的洞察如果能提前出现，很多桥段就不用走到狗血版。",
    emoji: "🦊",
    badgeEmoji: "🧭",
  }),
  "black-white": defineResult({
    slug: "rhino-inspector",
    animal: "犀牛",
    profession: "执法官",
    title: "犀牛执法官",
    tagline: "你对边界这件事不是说说而已，你像会拿角去把线直接顶出来。",
    shortSummary: "你执行到底线很清楚，对规则是否算数这件事格外在意。",
    longSummary:
      "犀牛执法官不会轻易把原则当成装饰品。你习惯明确责任、守住秩序，也有足够的力度让别人知道‘这件事不是说了玩玩’。在松散环境里，你往往像突然出现的实体边界。",
    strengths: [
      "你执行到底的能力很强，事情一旦划了线，就不容易被几句含糊话糊弄过去。",
      "你抗压很稳，真正需要有人顶住的时候，你能像实体边界一样站在那里。",
      "你边界清楚，特别适合处理责任混乱、规则失效和大家都想装没看见的场面。",
    ],
    riskPoints: [
      "你用力过猛时，容易把本来可以谈的灰度场面直接顶成硬碰硬。",
      "需要理解复杂动机时，你可能太快进入执法模式，让人只记得你的角，不记得你的理由。",
    ],
    recommendation:
      "把力度和解释一起给出去。你的强硬有价值，但只要多给一点来龙去脉，别人就不会只记得那支角。",
    emoji: "🦏",
    badgeEmoji: "🚨",
  }),
  "black-blue": defineResult({
    slug: "panther-operator",
    animal: "黑豹",
    profession: "操盘手",
    title: "黑豹操盘手",
    tagline: "你像在暗处盯盘的动物，脑子在算、手也没停，局面还经常真被你拨顺。",
    shortSummary: "你会算路径、看筹码、抓机会，擅长用精准动作换来大推进。",
    longSummary:
      "黑豹操盘手通常不靠热闹赢，靠的是精准。你对资源、时机和策略调度很有感觉，知道什么时候出手、什么时候忍住、什么时候把别人看不懂的牌先扣在自己手里。",
    strengths: [
      "你资源调度感很强，能看见谁、钱、时间和机会应该放在哪个位置才最有推进力。",
      "你动作准，不喜欢无意义地热闹，出手往往带着明确目的和时机判断。",
      "你结果导向清晰，能在复杂局面里抓住真正能改变走势的那几步。",
    ],
    riskPoints: [
      "你太专注结果时，容易显得功利，别人可能不知道自己是队友还是筹码。",
      "你不太爱暴露脆弱面，遇到压力也习惯自己消化，久了会让人误以为你不需要支持。",
    ],
    recommendation:
      "把你的判断过程适量公开一点。你不必把全部底牌摊在桌上，但让别人看见你不是只在算计，大家会更敢把筹码放到你这边。",
    emoji: "🐈‍⬛",
    badgeEmoji: "🎯",
  }),
  "black-red": defineResult({
    slug: "pig-emperor",
    animal: "猪",
    profession: "皇帝",
    title: "猪皇帝",
    tagline: "你的人格像一场荒诞而有效率的加冕礼，离谱、张扬，但居然真的能把事情推起来。",
    shortSummary: "你有气场、有野心、有戏剧性，还很会在关键时刻把场面拉到自己这边。",
    longSummary:
      "猪皇帝不是低调路线的动物。你对存在感、掌控感和成就感都很敏锐，喜欢大开大合，也有本事让别人记住你。你最迷人的地方不是完美，而是那种‘这局我来扛’的夸张王者味。",
    strengths: [
      "你气场很足，场面一虚一散，你往那里一站就像有人把主舞台灯打开了。",
      "你敢拍板，关键时刻不会一直把决定端在手里晾凉，而是愿意把局扛起来。",
      "你能把士气点起来，别人被你那股夸张但有劲的王者味一带，常会突然觉得还能再冲一轮。",
    ],
    riskPoints: [
      "你一认真就容易太用力，把普通推进开成登基大典，旁边的人还没入场就先被礼炮震住。",
      "强势过头时，你会挤压别人的发挥空间，大家可能只剩鼓掌和让路两个选项。",
    ],
    recommendation:
      "皇冠可以戴，麦也可以拿，但别忘了留一只耳朵给别人说话。你越能让别人也有戏，你的主场就越不容易变成独角戏。",
    emoji: "🐷",
    badgeEmoji: "👑",
  }),
  "black-green": defineResult({
    slug: "wolf-producer",
    animal: "狼",
    profession: "主理人",
    title: "狼群主理人",
    tagline: "你不是只想自己冲出去，你还想把整支队伍编成能一起咬住目标的群狼。",
    shortSummary: "你会争空间，也会搭班子，既想赢又知道不能一个人把局玩完。",
    longSummary:
      "狼群主理人擅长把人、资源和共同目标拧成一股绳。你有野心，但不只是单兵作战型野心，你更像那种想把团队一起带到更大地盘上的动物。",
    strengths: [
      "你会带人，不只是自己冲得快，也会想着怎么让一群人朝同一个方向咬住目标。",
      "你会搭系统，能把角色、资源和节奏编起来，让团队不是靠临时热血硬撑。",
      "你目标推进感强，适合把松散的想法变成真的有人负责、有人跟进的行动。",
    ],
    riskPoints: [
      "你容易揽活过多，觉得与其等别人慢慢来，不如先自己叼走，最后背上挂满任务牌。",
      "面对跟不上节奏的人，你的耐心会下降，可能还没问清原因就先把对方划进掉队名单。",
    ],
    recommendation:
      "群狼不是复印件。给不同成员留出各自的节奏感，你负责定方向和边界，不必把每个人都训练成同一种步伐。",
    emoji: "🐺",
    badgeEmoji: "🏕️",
  }),
  "red-white": defineResult({
    slug: "goose-knight",
    animal: "鹅",
    profession: "骑士",
    title: "鹅骑士",
    tagline: "你会带着正义感、脾气和一点嘎嘎作响的勇猛冲上去。",
    shortSummary: "你热烈、有原则、愿意为认定的事出头，不太接受软趴趴的灰区。",
    longSummary:
      "鹅骑士通常不是最圆滑的那只动物，但很可能是最愿意在关键时刻站出来的那个。你有热度，也有立场，一旦确认方向，就会拿着自己的那把正义长枪往前冲。",
    strengths: [
      "你讲义气，遇到重要的人和事，不太会躲在安全距离里只发表温和评论。",
      "你有勇气，关键时刻愿意站出来，把自己的立场和脾气一起亮在阳光下。",
      "你立场稳，不容易被软趴趴的说法糊弄，知道哪些东西不能随便让步。",
    ],
    riskPoints: [
      "你容易硬碰硬，别人只是伸出一个不同意见，你可能已经听见战鼓响了。",
      "你会把太多事情打成圣战，导致小摩擦升级成大型出征，体力和关系都被消耗。",
    ],
    recommendation:
      "别每次都全甲出征。先确认这是不是值得你拔剑的战场，有些局面用盾牌站住就够了，不必把长枪也举起来。",
    emoji: "🪿",
    badgeEmoji: "⚔️",
  }),
  "red-blue": defineResult({
    slug: "chameleon-experimenter",
    animal: "变色龙",
    profession: "实验导演",
    title: "变色龙实验导演",
    tagline: "你把脑洞、玩法和一点表演欲搅在一起，做成一锅让人想围观的试验汤。",
    shortSummary: "你喜欢新概念、新组合和新体验，而且不只是玩，你会真去试。",
    longSummary:
      "变色龙实验导演擅长把灵感变成实验，把实验变成戏剧效果。你既爱新鲜感，也有理解机制的兴趣，所以往往不是单纯乱玩，而是边玩边升级玩法。",
    strengths: [
      "你创意很灵活，能把看似不相干的概念换个颜色、换个角度，突然做成新玩法。",
      "你适应快，环境一变，你不一定慌，反而会开始测试这套新光线下能玩什么。",
      "你敢试验，不会把灵感永远放在脑内展柜里，而是愿意拿出来让现实碰一碰。",
    ],
    riskPoints: [
      "你容易同时开太多坑，每个都很有意思，但每个都在向你要后续维护费。",
      "持续性需要管理，热度过去后，你可能想换皮肤、换舞台、换项目，原实验还在原地冒烟。",
    ],
    recommendation:
      "每次只让一个主实验上台。别把整间实验室一起点亮，先让一个想法跑完闭环，你的变化能力才不会变成现场烟雾。",
    emoji: "🦎",
    badgeEmoji: "🧪",
  }),
  "red-black": defineResult({
    slug: "lion-commander",
    animal: "狮子",
    profession: "总攻官",
    title: "狮子总攻官",
    tagline: "你像会在鼓点最响的时候冲到最前排，把局面直接推到高潮。",
    shortSummary: "你既想掌控场面，也想把自己的热度和胆量一起甩到最前线。",
    longSummary:
      "狮子总攻官自带压迫感和舞台感。你不爱拖泥带水，关键时刻常常想亲自上阵，用爆发力和存在感把局面直接顶穿。这种气势很能带人，但也很能压人。",
    strengths: [
      "你爆发力很猛，关键节点一到，能把犹豫和拖延直接推到一边。",
      "你带头能力强，别人还在观察风向时，你已经站到前排把气势拉起来。",
      "你敢扛高压，不怕在紧张场面里承担可见责任，甚至会被这种强度唤醒。",
    ],
    riskPoints: [
      "你容易太冲，看到突破口就想立刻顶上去，身后队友可能还没系好鞋带。",
      "你的火力太满时，别人会跟不上节奏，甚至不知道自己是被带领还是被碾过。",
    ],
    recommendation:
      "冲锋前给团队留一个呼吸口。你可以继续当最先点燃的人，但把节奏喊清楚，你会更像将军而不是单兵导弹。",
    emoji: "🦁",
    badgeEmoji: "🚀",
  }),
  "red-green": defineResult({
    slug: "squirrel-lead-singer",
    animal: "松鼠",
    profession: "乐队主唱",
    title: "松鼠乐队主唱",
    tagline: "你会把热情唱成氛围，再把氛围唱成一群人都记得的现场。",
    shortSummary: "你很会把真实感和感染力揉在一起，让关系因为你的存在变得有声音。",
    longSummary:
      "松鼠乐队主唱通常不是单纯想热闹，而是很会用热闹制造连接。你擅长调动氛围、拉近距离、给场子注入鲜活感，所以常常是那个让大家从‘开会’变成‘有感觉’的人。",
    strengths: [
      "你感染力高，能把自己的热情传出去，让一群原本只是坐着的人开始真的有参与感。",
      "你擅长连接，常能用轻松、真诚和一点现场感把陌生距离唱短。",
      "你氛围营造强，很会让普通场合多一点记忆点，让大家觉得这不是又一次无聊集合。",
    ],
    riskPoints: [
      "外部情绪一大，你容易被带跑，别人的兴奋、焦虑或低落都会挤进你的主旋律。",
      "热度太高时，你的边界感会被冲淡，原本不该答应的事也可能在气氛里点了头。",
    ],
    recommendation:
      "先稳住自己的拍点，再带大家一起进歌。你不需要接住全场所有音量，留住自己的节奏，续航会更长。",
    emoji: "🐿️",
    badgeEmoji: "🎤",
  }),
  "green-white": defineResult({
    slug: "elephant-homeroom-teacher",
    animal: "大象",
    profession: "班主任",
    title: "大象班主任",
    tagline: "你会把人照顾好、把秩序扶起来、把局面安顿得像课间后重新坐好的教室。",
    shortSummary: "你温和但不糊，稳定但不冷，属于那种大家吵完架还想去找你的人。",
    longSummary:
      "大象班主任有非常强的场域安顿能力。你会留意情绪，也会留意规则，所以你不是单纯温柔，而是会让人觉得‘这里终于有人看着了’的那种稳定。",
    strengths: [
      "你照顾周全，能同时看见人的情绪、规则的需要和场面的秩序，不会只顾一头。",
      "你的边界温和但存在，既能安抚人，也能在必要时提醒大家回到座位上。",
      "你稳定感强，像一间终于有人开灯的教室，让吵过闹过的人重新知道可以往哪儿坐。",
    ],
    riskPoints: [
      "你容易变成人形缓冲垫，大家有情绪就往你这儿放，最后震动都被你一个人吸收。",
      "你习惯过度负责，哪怕不是你的作业，也会忍不住检查有没有人没交。",
    ],
    recommendation:
      "你不是全班的无限供电宝。照顾别人之前先确认自己还有电，必要时把责任还给该交作业的人。",
    emoji: "🐘",
    badgeEmoji: "📚",
  }),
  "green-blue": defineResult({
    slug: "whale-navigator",
    animal: "鲸鱼",
    profession: "导航员",
    title: "鲸鱼导航员",
    tagline: "你不一定最吵，但经常是那个已经知道该往哪片海游的人。",
    shortSummary: "你有耐心、有深度、有方向感，像安静但很准的远航雷达。",
    longSummary:
      "鲸鱼导航员通常不靠气势带路，靠的是长期判断和情绪稳定。你会认真感受环境、关系和趋势，再慢慢给出方向，所以你的决定往往不是最热闹的，却很有后劲。",
    strengths: [
      "你方向感好，不一定抢着发号施令，但常能在长期趋势里听出该往哪片海游。",
      "你判断深，会把关系、环境和时间线一起纳入考虑，所以结论通常有后劲。",
      "你稳定可靠，适合在大家被短期浪花拍乱时，提供一个慢但准的远航坐标。",
    ],
    riskPoints: [
      "你表达偏慢，等你终于把完整地图摊开，别人可能已经划着小船冲向岔路。",
      "你容易把需求憋太久，以为自己还能再撑一段，结果等开口时已经是深海回声。",
    ],
    recommendation:
      "你脑子里的地图很值钱，记得早点发出来给大家看。哪怕还不是最终航线，先给一个方向，也能避免队伍乱游。",
    emoji: "🐋",
    badgeEmoji: "🗺️",
  }),
  "green-black": defineResult({
    slug: "ant-producer",
    animal: "蚂蚁",
    profession: "制作人",
    title: "蚂蚁制作人",
    tagline: "你会把散着的人、流程和资源默默搬运成一个真的能运转起来的项目。",
    shortSummary: "你不一定总站台前，但很多像样的成果背后都像有你在搬砖和调度。",
    longSummary:
      "蚂蚁制作人很擅长协同系统。你知道谁适合哪里、资源该怎么放、节奏该怎么排，所以很多别人看着乱的项目到你手里会开始出现‘哦，它真的在往前走’的感觉。",
    strengths: [
      "你协调很强，能把散落的人、流程和资源一点点搬到该在的位置。",
      "你执行细致，不一定每次都站在台前，但很多成果能成形，背后常有你在默默校准节奏。",
      "你资源配置准，知道谁适合做什么、哪一步该先动，项目到你手里会开始有运转感。",
    ],
    riskPoints: [
      "压力会在你这里静音堆积，外面看起来一切正常，地底仓库其实已经快满了。",
      "你容易把自己排在最后，先补别人、先救项目、先交付成果，最后才发现自己也需要补给。",
    ],
    recommendation:
      "别把需求都埋在地底仓库里。适当喊一声，队友才知道你也需要补给；协同不是你一个人搬完整座山。",
    emoji: "🐜",
    badgeEmoji: "🎛️",
  }),
  "green-red": defineResult({
    slug: "corgi-travel-poet",
    animal: "柯基",
    profession: "旅行诗人",
    title: "柯基旅行诗人",
    tagline: "你会边跑边感受世界，边感受边把生活写成带着体温的小段子。",
    shortSummary: "你重视体验、情绪和人味，像一只会在路上顺手收集故事的热乎动物。",
    longSummary:
      "柯基旅行诗人不一定有最严密的计划，但常常有最真切的生命感。你擅长把关系和感受串成故事，也很会用亲近、热情和轻巧的表达把别人拉进你的世界里。",
    strengths: [
      "你亲和力强，能把人拉进一种轻松的生活感里，让关系不只停在礼貌寒暄。",
      "你很有生活感，擅长把路上的细节、情绪和小故事收集起来，讲得有温度。",
      "你表达自然，不太像在念稿，更像把刚热好的体验端出来给大家分一口。",
    ],
    riskPoints: [
      "眼前感受一鲜活，你容易被带走，临时风景会把原计划轻轻推到路边。",
      "长期规划会松一点，自由奔跑很开心，但如果完全没路标，后面可能找不到自己把行李放哪儿了。",
    ],
    recommendation:
      "自由很好，但给自由装个闹钟。保留你的浪漫和即兴，同时给重要事项一点固定锚点，你会浪漫得更久。",
    emoji: "🐶",
    badgeEmoji: "🎒",
  }),
};

export function getAptiDefinition(archetypeKey: SoultraceArchetypeKey) {
  return APTI_RESULT_DEFINITIONS[archetypeKey];
}

export function getImagePath(slug: string) {
  return getIllustrationAsset(slug).path;
}

export function toPercent(value: number) {
  return Math.round(value * 100);
}

export function getDominantColorLabels(distribution: SoultraceDistribution) {
  return [...Object.entries(distribution)]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 2)
    .map(([color]) => COLOR_LABELS[color as SoultraceColor])
    .join(" / ");
}

function mapMatch(match: SoultraceTopMatch): AptiMappedMatch {
  return {
    ...match,
    aptiTitle: APTI_RESULT_DEFINITIONS[match.key].title,
  };
}

function getLocalAlignmentScore(
  archetypeKey: SoultraceArchetypeKey,
  distribution: SoultraceDistribution,
) {
  const colors = archetypeKey.split("-") as SoultraceColor[];
  const score =
    colors.reduce((sum, color) => sum + distribution[color], 0) /
    colors.length;

  return Number((score * 100).toFixed(1));
}

function createLocalMatch(
  key: SoultraceArchetypeKey,
  distribution: SoultraceDistribution,
): SoultraceTopMatch {
  return {
    key,
    name: SOULTRACE_ARCHETYPE_NAMES[key],
    alignmentScore: getLocalAlignmentScore(key, distribution),
  };
}

export function resolveNeighborMatches(
  currentKey: SoultraceArchetypeKey,
  distribution: SoultraceDistribution,
  topMatches: SoultraceTopMatch[],
): AptiMappedMatch[] {
  const selectedKeys = new Set<SoultraceArchetypeKey>([currentKey]);
  const neighbors: AptiMappedMatch[] = [];

  topMatches.forEach((match) => {
    if (selectedKeys.has(match.key) || neighbors.length >= 3) {
      return;
    }

    selectedKeys.add(match.key);
    neighbors.push(mapMatch(match));
  });

  if (neighbors.length >= 3) {
    return neighbors;
  }

  const fallbackMatches = SOULTRACE_ARCHETYPE_KEYS.map((key) =>
    createLocalMatch(key, distribution),
  ).sort((left, right) => right.alignmentScore - left.alignmentScore);

  fallbackMatches.forEach((match) => {
    if (selectedKeys.has(match.key) || neighbors.length >= 3) {
      return;
    }

    selectedKeys.add(match.key);
    neighbors.push(mapMatch(match));
  });

  return neighbors;
}

export function resolveAptiResult(
  archetypeKey: SoultraceArchetypeKey,
  response: SoultraceCompleteResponse,
): AptiResult {
  const definition = APTI_RESULT_DEFINITIONS[archetypeKey];

  return {
    archetypeKey,
    archetypeName: response.archetype.name,
    aptiSlug: definition.slug,
    animal: definition.animal,
    profession: definition.profession,
    title: definition.title,
    tagline: definition.tagline,
    shortSummary: definition.shortSummary,
    longSummary: definition.longSummary,
    strengths: definition.strengths,
    riskPoints: definition.riskPoints,
    recommendation: definition.recommendation,
    imagePath: getImagePath(definition.slug),
    emoji: definition.emoji,
    badgeEmoji: definition.badgeEmoji,
    distribution: response.distribution,
    entropy: response.entropy,
    shadowColors: response.shadowColors,
    topMatches: resolveNeighborMatches(
      archetypeKey,
      response.distribution,
      response.topMatches,
    ),
    resultId: response.resultId,
    resultUrl: response.resultUrl,
  };
}

export function ensureAllArchetypesAreMapped() {
  return SOULTRACE_ARCHETYPE_KEYS.every((key) => Boolean(APTI_RESULT_DEFINITIONS[key]));
}
