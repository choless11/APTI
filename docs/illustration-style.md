# APTI AI 海报风格与正式接入说明

## 当前状态

- 页面已经按正式 AI 成品图消费层接入
- 当前仓库还没有批量放入真实 `webp` 成品图
- 现阶段仍以 `public/illustrations/*.svg` 作为稳定兜底
- 一旦把对应 AI 图放入 `public/illustrations/ai/` 并登记到 `src/lib/illustration-manifest.json`，页面会自动优先使用 AI 图

## 正式资源规范

- AI 成品图路径：`public/illustrations/ai/<slug>.webp`
- SVG 兜底图路径：`public/illustrations/<slug>.svg`
- 资源清单来源：`src/lib/illustration-manifest.json`
- 页面消费入口：`src/lib/illustration-assets.ts`

消费规则只有一层：

1. 先看 `illustration-manifest.json` 是否把该 `slug` 登记为可用 AI 资源
2. 若已登记，则返回 `public/illustrations/ai/<slug>.webp`
3. 若未登记，则统一回退到 `public/illustrations/<slug>.svg`

“第几批出图”只是文档与生产节奏信息，不应影响页面消费逻辑。

## 画风方向

- 主方向：手绘童话怪趣
- 角色原则：动物拟人、职业道具明显、表情夸张但可爱
- 氛围原则：轻荒诞、亮色、有故事感，不走严肃时尚大片
- 质感原则：像精致绘本角色海报，不像企业宣传板报

## 视觉约束

- 动物身份必须一眼可读
- 职业身份必须一眼可读
- 角色动作要有戏，但不能乱
- 颜色要鲜艳，不要脏灰
- 整体效果要“怪得可爱”，不要“怪得吓人”

## 第一批建议优先出图

- `pig-emperor`
- `raven-chief-strategist`
- `cat-inventor`
- `flamingo-director`
- `capybara-gardener`

这些角色最适合作为首页、结果页和宣传图的第一批正式 AI 成品。

## 通用 Prompt 模板

```text
Use case: illustration-story
Asset type: personality result poster
Primary request: a whimsical storybook illustration for <title>
Subject: an anthropomorphic <animal> working as a <profession>
Scene/backdrop: expressive role-specific stage with props that instantly read the profession
Style/medium: hand-painted storybook illustration, weird but beautiful, playful absurd charm
Composition/framing: vertical hero poster, centered character, strong silhouette, collectible personality-card feel
Lighting/mood: bright theatrical lighting, colorful, mischievous, high character energy
Color palette: saturated but tasteful, warm highlights, soft painterly shadows
Text (verbatim): ""
Constraints: keep the animal readable, keep the job readable, charming not scary, exaggerated facial expression
Avoid: corporate vector look, photorealism, bland symmetry, horror, generic poster layout
```

## 角色清单

- `river-beaver-archivist`：河狸档案官
- `octopus-researcher`：章鱼研究员
- `cheetah-boss`：猎豹老板
- `flamingo-director`：火烈鸟导演
- `capybara-gardener`：水豚园丁
- `snowy-owl-auditor`：雪鸮审计官
- `bulldog-steward`：斗牛犬总管
- `rooster-spokesperson`：公鸡宣讲官
- `deer-restorationist`：梅花鹿修复师
- `dolphin-architect`：海豚架构师
- `raven-chief-strategist`：乌鸦参谋长
- `cat-inventor`：猫咪发明家
- `fox-observer`：狐狸观察员
- `rhino-inspector`：犀牛执法官
- `panther-operator`：黑豹操盘手
- `pig-emperor`：猪皇帝
- `wolf-producer`：狼群主理人
- `goose-knight`：鹅骑士
- `chameleon-experimenter`：变色龙实验导演
- `lion-commander`：狮子总攻官
- `squirrel-lead-singer`：松鼠乐队主唱
- `elephant-homeroom-teacher`：大象班主任
- `whale-navigator`：鲸鱼导航员
- `ant-producer`：蚂蚁制作人
- `corgi-travel-poet`：柯基旅行诗人
