# APTI Vercel 上线指南

这份文档对应当前仓库的正式对外发布方案：`Next.js + Vercel + 真实 SoulTrace`。

## 上线前准备

### 1. 本地确认项目可发布

在项目根目录执行：

```bash
npm install
npm run typecheck
npm run test
npm run build
```

只有这几项都通过，再继续对外发布。

### 2. 准备 GitHub 仓库

- 把当前项目推送到 GitHub
- 确保 `.env.local` 不会被提交
- 如果你本地登录过 Vercel CLI，`.vercel/` 目录也不要提交

## Vercel 部署步骤

### 1. 导入项目

- 登录 `Vercel`
- 点击 `Add New`
- 选择 `Project`
- 选择你的 GitHub 仓库并导入

### 2. 保持默认构建方式

当前项目就是标准 `Next.js` 应用，保持默认配置即可：

- Framework Preset：`Next.js`
- Build Command：默认 `next build`
- Output Directory：留空，使用默认 Next.js Server 输出
- Install Command：默认 `npm install`

不要选择静态导出，也不需要额外改造 SSR 配置。

### 3. 配置 Production 环境变量

在 `Vercel -> Project Settings -> Environment Variables` 中配置：

```env
SOULTRACE_API_URL=https://soultrace.app/api/agent
SOULTRACE_TIMEOUT_MS=12000
SOULTRACE_MOCK_MODE=0
```

说明：

- `SOULTRACE_API_URL` 指向真实 SoulTrace 接口
- `SOULTRACE_TIMEOUT_MS` 是当前项目默认的超时时间
- `SOULTRACE_MOCK_MODE=0` 表示线上环境使用真实测评，不走 mock

### 4. 触发部署

- 保存环境变量
- 点击 `Deploy`
- 等待构建完成

成功后你会得到一个 `*.vercel.app` 域名，这个域名就可以直接给别人访问。

## 发布后检查

### 功能链路检查

- 首页可以正常打开
- 点击“开始测试”后可以进入 `/assessment`
- 问卷可以正常拉取题目并逐题作答
- 完成测试后可以进入 `/result`
- 结果页能展示标题、文案、图片、五色分布和 Top 3 匹配

### 资源检查

- 若 `public/illustrations/ai/<slug>.webp` 存在，页面优先展示 AI 图
- 若 AI 图尚未接入，页面自动回退到 `public/illustrations/<slug>.svg`
- 页面不应出现断图或布局错乱

### 异常检查

- 当 SoulTrace 返回失败时，前端会显示错误提示
- 当 SoulTrace 返回 `429` 限流时，前端会显示限流相关提示，而不是白屏

## 上线后的重点观察项

上线后一周，建议重点看三件事：

- `429` 限流是否频繁出现
- 页面首屏和问卷提交流程是否稳定
- 接口是否经常因为超时失败

## 后续增强建议

如果访问量上来，优先补这几项：

- 服务端限流
- 错误日志监控
- 结果缓存
- 自定义域名

自定义域名不需要改代码，只要在 `Vercel` 里绑定域名并完成 DNS 配置即可。
