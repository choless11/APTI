# APTI

一个基于 `SoulTrace` 自适应问卷包装的中文人格评估 Web 项目。用户回答 24 道 1-7 分量表题目后，会得到一组 APTI 结果角色，也就是“动物 + 职业”人格画像，例如固定内置的 `猪皇帝`。

项目使用 `Next.js + TypeScript` 实现，包含：

- 首页介绍与入口
- 问卷页
- 结果页
- SoulTrace 服务端代理接口
- 题目本地化与情景化改写
- 25 组 APTI 结果映射
- 对应的静态角色海报资源
- AI 海报优先、SVG 兜底的正式资产解析规则

## 本地使用

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制环境变量模板：

```bash
copy .env.example .env.local
```

可用变量如下：

- `SOULTRACE_API_URL`
  默认值是 `https://soultrace.app/api/agent`
- `SOULTRACE_TIMEOUT_MS`
  SoulTrace 代理超时时间，默认 `12000`
- `SOULTRACE_MOCK_MODE`
  `0` 表示走真实 SoulTrace
  `1` 表示走本地 mock 流程，适合离线演示和 UI 调试

### 3. 启动开发环境

```bash
npm run dev
```

然后打开：

```text
http://localhost:3000
```

### 4. 本地体验方式

- 点击首页“开始测试”
- 在问卷页按 1 到 7 分提交答案
- 答完后自动跳转结果页
- 结果页会显示最近一次测试结果，并缓存在本地浏览器

如果你只是想先看界面、不依赖外部接口：

```env
SOULTRACE_MOCK_MODE=1
```

## 项目结构

```text
app/
  api/assessment/start/route.ts    初始化问卷
  api/assessment/answer/route.ts   提交答案并拿下一题或结果
  assessment/page.tsx              问卷页
  result/page.tsx                  结果页
src/
  components/                      UI 组件
  lib/apti-results.ts              25 组结果映射
  lib/question-localization.ts     题目中文情景化改写
  lib/illustration-assets.ts       AI 海报正式消费层解析
  lib/illustration-manifest.json   AI 海报资源清单
  lib/soultrace.ts                 SoulTrace 代理
  lib/mock-soultrace.ts            本地 mock
  lib/assessment-storage.ts        本地缓存
public/illustrations/              结果海报资源
docs/illustration-style.md         AI 海报风格与接入说明
```

## 代码说明

项目已经在关键逻辑处补了中文注释，主要覆盖：

- SoulTrace 代理和错误包装
- 问卷状态持久化
- 题目本地化与英文兜底
- 结果映射
- 页面跳转、本地缓存和图片兜底

注释策略是“解释为什么这样做”，而不是逐行翻译代码。

## 测试与检查

```bash
npm run typecheck
npm run test
```

当前测试覆盖了：

- 25 组原型映射完整性
- `猪皇帝` 固定映射
- 结果映射转换
- 已知题目的中文情景化改写
- 未知题目的 fallback 逻辑
- AI 海报路径的兜底规则
- `/api/assessment/start` 本地化输出
- `/api/assessment/answer` 成功与限流错误
- 问卷组件从开始答题到跳转结果页的主流程

## 题目本地化机制

- 服务端会先拿到 SoulTrace 原题
- 再按 `questionId` 做本地中文情景化改写
- 已收录题目显示“人类主视角 + 轻剧情设问”的中文题面
- 未收录题目显示自然中文提示，并在页面下方展示英文原句
- 开发环境下如果遇到未收录题目，会自动记录缺失题号，方便继续补题

这意味着项目不会在运行时调用额外的 AI 文本改写服务，行为更稳定，也更方便你自己继续补题库。

### 题目本地化风格原则

- 保留原题的心理测量意图，不改题意
- 主视角保持为“人”，不使用“如果你是一只动物”这类句式
- 优先使用会议、协作、冲突、复盘、选择、权威互动等真实场景
- 文案可以有趣，但不能写成纯段子

### 如何继续补 `questionId` 映射

- 在 `src/lib/question-localization.ts` 的 `CURATED_QUESTION_ENTRIES` 里新增 `{ id, text }`
- 文案延续当前的情景化风格，避免回到“动物第一视角”
- 运行 `npm run test`，确认题目本地化测试仍然通过
- 开发环境下看到控制台的缺失题号日志后，可以按日志补齐新题

## AI 海报正式接入机制

- 页面会优先读取 `public/illustrations/ai/<slug>.webp`
- 如果该文件未被正式纳入资源清单或文件还不存在，就自动回退到 `public/illustrations/<slug>.svg`
- 当前 AI 资源清单的唯一来源是 `src/lib/illustration-manifest.json`
- `src/lib/illustration-assets.ts` 只负责消费这个清单，不和“第几批出图”逻辑耦合

当前这轮没有批量生成真实 AI 海报文件，但页面、目录、命名和资源层已经按正式成品接入方式工作。后续只要把成品图按命名规范放进去，并更新清单，页面就会自动优先使用 AI 图。

### AI 成品图放置规则

- 目录：`public/illustrations/ai/`
- 文件名：`<slug>.webp`
- 清单登记：`src/lib/illustration-manifest.json`
- 兜底图：`public/illustrations/<slug>.svg`

详细风格和 prompt 规范见：

- `docs/illustration-style.md`

## 如果想让别人也来使用，怎么上线

### 推荐方式：Vercel

这是当前项目最省心的上线方式。

1. 先把当前项目推到 GitHub 仓库
2. 发布前在本地执行：
   - `npm install`
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
3. 登录 `Vercel`
4. 选择 `New Project`
5. 导入当前仓库
6. 保持默认的 `Next.js` 部署方式，不做静态导出
7. 在 Vercel 的项目环境变量里配置：
   - `SOULTRACE_API_URL`
   - `SOULTRACE_TIMEOUT_MS`
   - `SOULTRACE_MOCK_MODE=0`
8. 点击部署

部署完成后，Vercel 会给你一个域名，别人直接访问就可以使用。

### 线上环境变量建议值

- `SOULTRACE_API_URL=https://soultrace.app/api/agent`
- `SOULTRACE_TIMEOUT_MS=12000`
- `SOULTRACE_MOCK_MODE=0`

### 首次发布后要检查什么

- 首页可以正常打开
- 首页进入 `/assessment` 正常
- 完整答完一轮后可以进入 `/result`
- 结果页标题、文案、图片、五色分布、Top 3 匹配显示正常
- `public/illustrations/ai/` 里没有成品图时，SVG 兜底依然正常
- 当第三方接口失败或限流时，页面会显示友好错误提示，而不是白屏

### 更详细的 Vercel 上线步骤

- `docs/deploy-vercel.md`

### 上线时建议注意

- 由于 SoulTrace 有频率限制，公开给很多人使用时要留意 `429`
- 如果后续访问量增大，建议在服务端增加：
  - 简单限流
  - 日志监控
  - 结果缓存
- 如果你想做自己的正式品牌版本，可以：
  - 先在 `public/illustrations/ai/` 中逐批放入 AI 成品图
  - 同步更新 `src/lib/illustration-manifest.json`
  - 修改 `src/lib/apti-results.ts` 中的文案和命名
  - 接入数据库保存历史结果和分享页

## 后期怎么继续升级

- 把当前更多角色从 SVG 兜底图升级成 AI 位图插画
- 给结果页增加分享图导出
- 加入用户历史记录
- 增加邀请码、活动页、排行榜或结果对比玩法
- 持续补充 SoulTrace 题目的本地化覆盖率
