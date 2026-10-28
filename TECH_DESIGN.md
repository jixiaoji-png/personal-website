---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 7f04b5e7c98af89451e8d7aaef427a6f_fd34f88ad26d11f1a301525400cd780f
    ReservedCode1: z1CmKJB3fLqFtbqyWv/ULWmNkDCOOkk2+ajOFrGWAqzEphc9Mq6ytguA7VlZBlC1B1FaZFaccffofnUqawFta0+VOPc+sf8xW3ugSs+ptU1rj1sziezLlqpYNswimBOmuqYpgbAyFiZiJPPjKrlBtlC0DCepwK6QfQpwL/bIPunQVyftfCke0Evp/zQ=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 7f04b5e7c98af89451e8d7aaef427a6f_fd34f88ad26d11f1a301525400cd780f
    ReservedCode2: z1CmKJB3fLqFtbqyWv/ULWmNkDCOOkk2+ajOFrGWAqzEphc9Mq6ytguA7VlZBlC1B1FaZFaccffofnUqawFta0+VOPc+sf8xW3ugSs+ptU1rj1sziezLlqpYNswimBOmuqYpgbAyFiZiJPPjKrlBtlC0DCepwK6QfQpwL/bIPunQVyftfCke0Evp/zQ=
---



# 青屿 QINGYU · 技术设计文档（TECH_DESIGN）

> 版本：v1.0 · 日期：2026-10-28
> 关联文档：[PRD.md](./PRD.md) · [AGENTS.md](./AGENTS.md)

---

## 一、技术栈选择

| 层 | 选型 | 版本 | 选型理由 |
| --- | --- | --- | --- |
| 框架 | React + TypeScript | React 18.3 / TS 5.5 | 组件化、类型安全，生态成熟 |
| 构建工具 | Vite | 5.4 | 冷启动快、构建产物为纯静态，天然适配托管平台 |
| 样式方案 | 手写 CSS + CSS 变量 | — | 完全掌控「墨纸森系」视觉，避免框架模板感 |
| Markdown 渲染 | marked + marked-highlight + highlight.js | marked 12 / hljs 11 | 轻量、社区标准，代码高亮开箱即用 |
| 文章加载 | Vite `import.meta.glob`（query: '?raw'） | — | 新增 MD 文件自动纳入构建，满足"新增即更新" |
| 路由 | 自研轻量 hash 路由 | — | 仅需 `#/post/:slug` 一种详情场景，无需引入路由库 |
| 动效 | IntersectionObserver + CSS transition | — | 原生实现滚动渐显，无额外依赖 |
| 部署目标 | Vercel / Cloudflare Pages | — | 静态托管，支持自动构建、免费 HTTPS、CDN（参考《7.部署》） |

### 为什么不选

- **Tailwind CSS**：Utility-first 风格易产生"模板感"，与个性化诉求冲突；本项目用 CSS 变量 + 语义类更可控
- **react-router-dom**：本项目路由形态极简（首页 + 博客详情），hash 路由 30 行内可覆盖，减少依赖
- **Next.js**：静态个人站无需 SSR/ISR，Vite 产物更轻、部署更简单

---

## 二、项目结构

```
personal-website/
├── index.html                 # HTML 入口（SEO meta、favicon）
├── package.json
├── vite.config.ts             # Vite 配置（base: './'，适配子路径部署）
├── tsconfig.json / tsconfig.node.json
├── public/
│   └── favicon.svg            # 印章风站点图标
├── src/
│   ├── main.tsx               # React 入口
│   ├── App.tsx                # 极简 hash 路由 + 页面组装
│   ├── index.css              # 全局设计系统（CSS 变量主题 + 全部组件样式 + 响应式）
│   ├── vite-env.d.ts
│   ├── data/                  # 内容数据层（与组件分离）
│   │   ├── profile.ts         # 个人信息 + 时间线
│   │   ├── skills.ts          # 技能分类数据
│   │   ├── projects.ts        # 项目数据（含详情）
│   │   └── posts.ts           # 博客元数据 + import.meta.glob 加载 MD
│   ├── components/
│   │   ├── Navbar.tsx         # 吸顶导航 + 移动端汉堡菜单
│   │   ├── Hero.tsx           # 首页首屏 + 印章装饰
│   │   ├── About.tsx          # 简介 + 时间线
│   │   ├── Skills.tsx         # 技能卡片 + 进度条动画
│   │   ├── Projects.tsx       # 项目网格 + 详情模态框
│   │   ├── Blog.tsx           # 博客列表
│   │   ├── BlogPost.tsx       # 博客详情（marked 渲染 + 高亮 + TOC）
│   │   ├── Contact.tsx        # 联系信息 + 留言表单（校验）
│   │   ├── Footer.tsx
│   │   └── Reveal.tsx         # 滚动渐显容器
│   └── posts/                 # 博客 Markdown 源文件（新增即自动更新）
│       ├── hello-qingyu.md
│       ├── ai-assisted-dev.md
│       └── css-paper-design.md
└── dist/                      # 构建产物（部署时上传此目录）
```

---

## 三、数据模型

> 数据均以 TypeScript 接口定义，位于 `src/data/`，构建时静态打包，无运行时后端。

### 3.1 Profile（个人信息）

```ts
interface TimelineItem {
  time: string   // 时间段，如 "2023 — 至今"
  title: string  // 职位 / 经历标题
  desc: string   // 描述
}
interface Profile {
  name: string
  englishName: string
  role: string
  slogan: string
  intro: string[]          // 简介段落
  timeline: TimelineItem[]
}
```

### 3.2 Skill（技能）

```ts
interface SkillItem { name: string; level: number } // level 0-100
interface SkillCategory { cat: string; items: SkillItem[] }
```

### 3.3 Project（项目）

```ts
interface Project {
  slug: string
  title: string
  desc: string
  tags: string[]
  cover: string      // 封面文字
  coverBg: string    // 封面渐变
  detail: string[]   // 详情亮点（模态框展示）
  demo?: string      // 体验链接
  repo?: string      // 源码链接
}
```

### 3.4 Post（博客）

```ts
interface PostMeta {
  slug: string
  title: string
  date: string       // YYYY-MM-DD
  tags: string[]
  excerpt: string
}
interface PostContent {
  meta: PostMeta
  raw: string        // 来自 src/posts/<slug>.md 的原始文本
}
```

---

## 四、关键技术点

### 4.1 Markdown 驱动博客（新增即更新）

```ts
const modules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
```

- 构建时把 `src/posts/` 下所有 `.md` 以纯文本打包进 bundle
- `postIndex` 维护元数据（标题 / 日期 / 标签 / 摘要），与 MD 文件名通过 `slug` 关联
- **新增文章流程**：① 写 `src/posts/xx.md` → ② 在 `postIndex` 加一条元数据 → ③ 重新构建，列表自动出现

### 4.2 Markdown 渲染与代码高亮

- `marked.use(markedHighlight(...))` 注入 highlight.js 高亮
- `langPrefix: 'hljs language-'` 保证高亮主题（github-dark）正确命中
- 渲染产物经 `dangerouslySetInnerHTML` 输出，内容为项目自有的 MD 文件（可信来源）

### 4.3 极简 hash 路由

```ts
function parseHash(): string | null {
  const m = window.location.hash.match(/^#\/post\/([^/]+)/)
  return m ? decodeURIComponent(m[1]) : null
}
```

- `#/post/<slug>` → 渲染 `BlogPost`；其他 hash → 首页 + 锚点滚动
- 监听 `hashchange` 驱动状态，无路由库依赖
- 锚点导航（`#about` 等）由原生 `scroll-behavior: smooth` + `scrollIntoView` 完成

### 4.4 个性化视觉系统

- 全部设计令牌收敛在 `:root` CSS 变量（色板 / 字体 / 圆角 / 阴影）
- 纸张噪点：`feTurbulence` SVG data-URI 叠加在 body 背景（opacity 0.05）
- 印章装饰：圆形边框 + 旋转 -7deg + 焦糖色径向渐变
- 响应式断点：1024px（两列）、640px（单列 + 汉堡菜单）

### 4.5 动效与无障碍

- `Reveal` 组件：IntersectionObserver 在进入视口时添加 `.visible`，触发 opacity + translateY 过渡
- 技能进度条：进入视口后把 `width` 从 0 过渡到目标百分比
- `prefers-reduced-motion: reduce` 时关闭全部动效与平滑滚动
- 卡片可键盘操作（Enter / 空格打开），装饰元素 `aria-hidden`

### 4.6 构建与部署

- `vite.config.ts` 设置 `base: './'`，产物可用相对路径，部署到任意子路径/域名均可用
- 输出 `dist/` 为纯静态目录，Vercel / Cloudflare Pages 选择对应框架预设（None / Vite）即可完成部署

---

## 五、性能与约束

| 项 | 说明 |
| --- | --- |
| 产物体积 | JS 约 1.2MB（含 highlight.js 全量语言），可后续改为按需加载语言包 |
| 首屏 | 单页面无路由分包，首屏即完整 bundle；如需优化可做 `manualChunks` 拆分 |
| 图片 | 项目封面为 CSS 渐变 + 文字，无外链图片请求，加载极快 |
| 兼容性 | 现代浏览器；`backdrop-filter` 不支持时退化为不透明背景（不影响可用性） |
*（内容由AI生成，仅供参考）*
*（内容由AI生成，仅供参考）*
