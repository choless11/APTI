import { getIllustrationAsset } from "@/src/lib/illustration-assets";
import {
  SOULTRACE_ARCHETYPE_KEYS,
  type AptiMappedMatch,
  type AptiResult,
  type SoultraceArchetypeKey,
  type SoultraceColor,
  type SoultraceCompleteResponse,
  type SoultraceDistribution,
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
    strengths: ["稳得住局面", "说明白规则", "让人有安全感"],
    riskPoints: ["容易替全世界兜底", "把弹性压得过扁"],
    recommendation: "别什么都亲自封箱编号，留一点野生空间，世界不会立刻散架。",
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
    strengths: ["理解力深", "脑内模型多", "不怕复杂"],
    riskPoints: ["容易研究过头", "把执行拖成论文"],
    recommendation: "当你已经懂到七成时，就可以先伸出一只触手去做了。",
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
    strengths: ["起步快", "目标感强", "敢于拍板"],
    riskPoints: ["容易显得太硬", "忽略他人的跟上成本"],
    recommendation: "把“为什么这么做”讲出来，别人会更愿意跟你一起冲。",
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
    strengths: ["感染力强", "表达直接", "行动带火花"],
    riskPoints: ["上头速度快", "情绪容易抢方向盘"],
    recommendation: "开演前先深呼吸十秒，你的直觉会更像神来一笔，而不是临场翻车。",
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
    strengths: ["包容度高", "耐心很长", "擅长养环境"],
    riskPoints: ["容易过度迁就", "把自己的边界养没了"],
    recommendation: "温柔不等于无限供应，记得给自己的草坪也浇点水。",
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
    strengths: ["标准感清晰", "判断稳", "善于纠偏"],
    riskPoints: ["容易对人过严", "快乐经常被细节偷走"],
    recommendation: "不是每只动物都配得上你的一毫米精度，先判断值不值得。",
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
    strengths: ["扛得住事", "执行有力", "底线很硬"],
    riskPoints: ["控制欲偏高", "别人容易先怕你再理解你"],
    recommendation: "在发号施令前先说清你想保护什么，硬度会更有说服力。",
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
    strengths: ["号召力强", "立场清楚", "敢发声"],
    riskPoints: ["容易讲太满", "说服可能变成压迫"],
    recommendation: "少一点连珠炮，多一点对话感，你的话会更容易落进别人耳朵里。",
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
    strengths: ["修复关系", "稳定场域", "细腻而不软"],
    riskPoints: ["默默背太多", "容易被冲突拖空电量"],
    recommendation: "不是每个破洞都归你补，先分清责任再动手。",
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
    strengths: ["系统化能力强", "逻辑线清楚", "规划稳"],
    riskPoints: ["容易过度设计", "看见混乱就想立刻重构"],
    recommendation: "先让它能跑，再让它优雅，别一上来就给小木屋画高楼图纸。",
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
    strengths: ["会布局", "预判强", "分析和执行都在线"],
    riskPoints: ["容易想太多步", "让人看不透时会显得冷"],
    recommendation: "偶尔把计划书翻开一页给队友看，信任会跟上你的脑速。",
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
    strengths: ["脑洞灵", "学得快", "善于试新"],
    riskPoints: ["很容易分神", "新鲜感一过就想跳槽"],
    recommendation: "先把最想做的点子做成 mini 版，不然灵感会像猫一样一下就跑了。",
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
    strengths: ["洞察细", "判断稳", "有同理心"],
    riskPoints: ["表达偏保守", "容易被误判成佛系围观"],
    recommendation: "该开口时早一点开口，别总等到剧情播完才放彩蛋。",
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
    strengths: ["执行到底", "抗压很强", "边界清楚"],
    riskPoints: ["过于刚猛", "灰度空间不够多"],
    recommendation: "把力度和解释一起给出去，别人就不会只记得你的角。",
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
    strengths: ["资源调度强", "动作准", "结果导向清晰"],
    riskPoints: ["容易显得太功利", "不爱暴露脆弱面"],
    recommendation: "把你的判断过程适量公开一点，别人会更敢把筹码放到你这边。",
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
    strengths: ["气场很足", "敢拍板", "能把士气点起来"],
    riskPoints: ["容易太用力", "强势过头会挤压别人"],
    recommendation: "皇冠可以戴，麦也可以拿，但别忘了留一只耳朵给别人说话。",
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
    strengths: ["会带人", "会搭系统", "目标推进感强"],
    riskPoints: ["容易揽活过多", "对掉队者耐心不足"],
    recommendation: "群狼不是复印件，给不同成员留出各自的节奏感。",
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
    strengths: ["讲义气", "有勇气", "立场稳"],
    riskPoints: ["容易硬碰硬", "什么都想打成圣战"],
    recommendation: "别每次都全甲出征，先确认这是不是值得你拔剑的战场。",
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
    strengths: ["创意灵活", "适应快", "敢试验"],
    riskPoints: ["容易同时开太多坑", "持续性需要管理"],
    recommendation: "每次只让一个主实验上台，别把整间实验室一起点亮。",
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
    strengths: ["爆发力猛", "带头能力强", "敢扛高压"],
    riskPoints: ["容易太冲", "别人可能跟不上你的火力"],
    recommendation: "冲锋前给团队留一个呼吸口，你会更像将军而不是单兵导弹。",
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
    strengths: ["感染力高", "擅长连接", "氛围营造强"],
    riskPoints: ["容易被外部情绪带跑", "边界感会被热度冲淡"],
    recommendation: "先稳住自己的拍点，再带大家一起进歌，续航会更长。",
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
    strengths: ["照顾周全", "边界温和", "稳定感强"],
    riskPoints: ["容易变成人形缓冲垫", "习惯过度负责"],
    recommendation: "你不是全班的无限供电宝，记得给自己也留点电。",
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
    strengths: ["方向感好", "判断深", "稳定可靠"],
    riskPoints: ["表达偏慢", "容易把需求憋太久"],
    recommendation: "你脑子里的地图很值钱，记得早点发出来给大家看。",
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
    strengths: ["协调很强", "执行细致", "资源配置准"],
    riskPoints: ["压力会静音堆积", "容易把自己排在最后"],
    recommendation: "别把需求都埋在地底仓库里，适当喊一声，队友才知道你也需要补给。",
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
    strengths: ["亲和力强", "有生活感", "表达自然"],
    riskPoints: ["容易被眼前感受带走", "长期规划会松一点"],
    recommendation: "自由很好，但给自由装个闹钟，你会浪漫得更久。",
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

function mapTopMatches(
  response: SoultraceCompleteResponse,
): AptiMappedMatch[] {
  return response.topMatches.map((match) => ({
    ...match,
    aptiTitle: APTI_RESULT_DEFINITIONS[match.key].title,
  }));
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
    topMatches: mapTopMatches(response),
    resultId: response.resultId,
    resultUrl: response.resultUrl,
  };
}

export function ensureAllArchetypesAreMapped() {
  return SOULTRACE_ARCHETYPE_KEYS.every((key) => Boolean(APTI_RESULT_DEFINITIONS[key]));
}
