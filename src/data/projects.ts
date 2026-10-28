export interface Project {
  slug: string
  title: string
  desc: string
  tags: string[]
  cover: string
  coverBg: string
  detail: string[]
  demo?: string
  repo?: string
}

export const projects: Project[] = [
  {
    slug: 'qingyu-site',
    title: '青屿 · 个人主页',
    desc: '本网站。墨纸森系风格的单页应用，支持博客 Markdown 动态加载、响应式布局与无障碍优化。',
    tags: ['React', 'TypeScript', 'Vite', 'Markdown'],
    cover: '青屿',
    coverBg: 'linear-gradient(135deg, #E3EDE4 0%, #F3E9D8 100%)',
    detail: [
      '从设计系统到组件，全部自行定义：米纸底色、松墨绿主色、衬线标题，构建独特的「墨纸森系」视觉语言。',
      '博客通过 Vite import.meta.glob 动态加载 Markdown，新增文章文件即可自动出现在列表中。',
      '实现了滚动渐显、移动端汉堡菜单、表单校验反馈与 prefers-reduced-motion 降级。',
    ],
    demo: '#/',
  },
  {
    slug: 'reader-app',
    title: '拾光 · 电子书阅读器',
    desc: '从 0 到 1 的 AI 辅助桌面应用实战：TXT 阅读、阅读进度记忆、主题切换，Electron + React 实现。',
    tags: ['Electron', 'React', 'AI 辅助开发'],
    cover: '拾光',
    coverBg: 'linear-gradient(135deg, #F5E6CF 0%, #DFE8D9 100%)',
    detail: [
      '遵循「PRD → TECH_DESIGN → AGENTS.md → 实现」的 AI 协作开发流程，先跑通 MVP 再迭代。',
      '核心能力：TXT 文本解析、进度自动保存、深浅主题切换、快捷键翻页。',
      '积累了 AI 辅助开发的完整文档模板，沉淀为团队最佳实践。',
    ],
    repo: 'https://github.com/example/reader-app',
  },
  {
    slug: 'image-picker',
    title: '图摘 · 电商图片提取器',
    desc: 'Chrome 扩展：一键提取电商详情页全部图片，可视化勾选并批量打包下载为 PNG。',
    tags: ['Chrome 扩展', 'Manifest V3', 'Canvas'],
    cover: '图摘',
    coverBg: 'linear-gradient(135deg, #E8DFD0 0%, #CBE0D3 100%)',
    detail: [
      '支持懒加载图片自动滚动提取、CDN 缩略图原图还原与干扰图过滤。',
      '跨域图片通过 Background 代理转 PNG，多张图片队列并发下载并打包 ZIP。',
      '权限最小化，全程本地处理，无数据上传。',
    ],
    repo: 'https://github.com/example/image-picker',
  },
  {
    slug: 'forest-dashboard',
    title: '林梢 · 数据看板',
    desc: '面向内容团队的轻量数据可视化平台：多数据源接入、自定义报表与自动周报。',
    tags: ['Vue 3', 'ECharts', 'FastAPI'],
    cover: '林梢',
    coverBg: 'linear-gradient(135deg, #D8E6D4 0%, #F1E4D2 100%)',
    detail: [
      '前后端分离：Vue 3 + ECharts 负责可视化，FastAPI 提供聚合查询接口。',
      '支持拖拽式报表编排与定时导出周报，团队日常运营效率提升约 60%。',
    ],
    demo: 'https://example.com/forest',
  },
  {
    slug: 'type-notes',
    title: '码字 · 极简笔记',
    desc: '类 Notion 的轻量 Markdown 笔记应用：块编辑、双向链接与本地优先存储。',
    tags: ['React', 'IndexedDB', 'CRDT'],
    cover: '码字',
    coverBg: 'linear-gradient(135deg, #F2E8D8 0%, #DCE9DC 100%)',
    detail: [
      '本地优先架构，数据存 IndexedDB，离线可用，后续支持端到端同步。',
      '块级编辑器支持代码、表格、图片等块类型，双向链接自动生成关系图。',
    ],
    repo: 'https://github.com/example/type-notes',
  },
  {
    slug: 'a11y-lint',
    title: '无障碍体检工具',
    desc: '开源 CLI + 浏览器插件：自动扫描页面对比度、语义标签与键盘可达性。',
    tags: ['TypeScript', 'axe-core', '开源'],
    cover: 'A11y',
    coverBg: 'linear-gradient(135deg, #E7DECD 0%, #CBDDC8 100%)',
    detail: [
      '基于 axe-core 扩展规则集，输出可读的修复建议与影响范围评分。',
      'CLI 可接入 CI 流水线，浏览器插件提供实时体检面板。',
      '开源社区维护，累计 1.2k Star。',
    ],
    repo: 'https://github.com/example/a11y-lint',
  },
]
