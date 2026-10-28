---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 7f04b5e7c98af89451e8d7aaef427a6f_e1c96da8d26a11f18068525400de85a5
    ReservedCode1: mo26yl/iECi7jETIfTs3joBJYDlsKLMD1L2hypccl+m+CO19oxnIJApp5MTWUptjyjCtLDEH688fMOERkvnnesEmcky7ULm6fjOnhZ+TwqeNFhzgbBhsPvgnhMId1DYqlFiz7CqRFuOJnkCWlnfFqKj0Yx3HC13DkRBSZZ3fRj39UsvPrB6VINOI/0c=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 7f04b5e7c98af89451e8d7aaef427a6f_e1c96da8d26a11f18068525400de85a5
    ReservedCode2: mo26yl/iECi7jETIfTs3joBJYDlsKLMD1L2hypccl+m+CO19oxnIJApp5MTWUptjyjCtLDEH688fMOERkvnnesEmcky7ULm6fjOnhZ+TwqeNFhzgbBhsPvgnhMId1DYqlFiz7CqRFuOJnkCWlnfFqKj0Yx3HC13DkRBSZZ3fRj39UsvPrB6VINOI/0c=
---

# AGENTS.md

> 面向 AI 协作开发的项目说明文档（Codex / Copilot / Cursor / Marvis 通用）
> 最后更新：2026-10-28

## 项目概述

**青屿 QINGYU** 是一个个人展示网站：包含个人介绍、技能展示、项目作品集、Markdown 博客与联系表单。视觉风格为自研的「墨纸森系」——暖米纸底色、松墨绿主色、焦糖点缀、衬线标题，**严禁改成模板化的深色星空风格或使用现成 UI 模板**。

## 技术栈（硬性约定）

| 项 | 约定 |
| --- | --- |
| 框架 | React 18 + TypeScript 5（strict 模式） |
| 构建 | Vite 5，`base: './'` |
| 样式 | 手写 CSS + CSS 变量（`src/index.css`），**禁止引入 Tailwind / 组件库** |
| 博客 | marked + marked-highlight + highlight.js；文章放 `src/posts/*.md` |
| 路由 | 自研 hash 路由（`App.tsx` 内），**禁止引入 react-router** |
| 部署 | 构建产物 `dist/`，兼容 Vercel / Cloudflare Pages |

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 本地开发（http://localhost:5173）
npm run build      # 类型检查 + 生产构建（输出 dist/）
npm run preview    # 本地预览构建产物
```

## 目录结构

```
src/
├── main.tsx          # 入口
├── App.tsx           # hash 路由 + 页面组装
├── index.css         # 设计系统（CSS 变量）与全部组件样式
├── data/             # 内容数据层（profile / skills / projects / posts）
├── components/       # 页面组件（Navbar / Hero / About / Skills / Projects / Blog / BlogPost / Contact / Footer / Reveal）
└── posts/            # 博客 Markdown 源文件
```

## 开发规范

1. **数据与组件分离**：个人 / 技能 / 项目内容只改 `src/data/*.ts`，博客正文只改 `src/posts/*.md`，不要硬编码进组件。
2. **样式规范**：
   - 所有颜色 / 字体 / 圆角必须取自 `index.css` 的 CSS 变量，不写死魔法值
   - 组件 className 使用语义化命名（如 `project-card`、`skill-bar`）
   - 新样式写入 `index.css` 对应区块，保持单一文件组织
3. **TypeScript**：严格模式开启，禁止 `any`；新增接口定义在 `src/data/` 对应文件。
4. **无障碍**：交互元素保留键盘可达性与 `aria-label`；装饰性 SVG 加 `aria-hidden`。
5. **动效**：滚动渐显统一走 `Reveal` 组件；必须支持 `prefers-reduced-motion` 降级。
6. **响应式**：断点 1024px（两列）与 640px（单列）；移动端导航用汉堡菜单。
7. **提交规范**：一个功能一次提交，提交信息用中文简要说明（如 `feat: 新增博客标签筛选`）。

## 新增博客文章流程

1. 在 `src/posts/` 新建 `<slug>.md`（YAML 可选，正文为 Markdown）
2. 在 `src/data/posts.ts` 的 `postIndex` 数组追加元数据（slug 与文件名一致）
3. `npm run build` 后列表自动出现新文章

## 测试与验收要求

- 修改后必须 `npm run build` 通过（含 TypeScript 类型检查）
- 本地 `npm run preview` 人工检查：桌面端（1200px）与移动端（375px）无横向滚动
- 检查锚点导航、博客详情返回、表单校验反馈、模态框开关是否正常
- 检查控制台无报错

## 注意事项

- 本项目为纯静态站，无后端；联系表单为前端校验 + 演示反馈，不发送真实邮件
- 博客内容为项目自有 MD 文件（可信来源），`dangerouslySetInnerHTML` 使用安全
- 若需引入新依赖，优先选择轻量包并说明理由；禁止为小功能引入重型框架
- 不要修改 `dist/` 产物，统一由 `npm run build` 生成
*（内容由AI生成，仅供参考）*
