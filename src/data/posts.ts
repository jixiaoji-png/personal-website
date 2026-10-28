// 博客文章通过 Vite import.meta.glob 动态加载 posts 目录下的 Markdown 文件。
// 新增文章只需在 src/posts/ 下添加 .md 文件并维护 postIndex 元数据即可。

export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

export const postIndex: PostMeta[] = [
  {
    slug: 'hello-qingyu',
    title: '你好，青屿：一块属于自己的安静小岛',
    date: '2026-10-20',
    tags: ['随笔', '网站'],
    excerpt: '为什么会有这个网站？它不追热点、不图流量，只是一块留给思考与表达的安静之地。',
  },
  {
    slug: 'ai-assisted-dev',
    title: '用 AI 从 0 到 1 做一个产品：我的完整工作流',
    date: '2026-09-28',
    tags: ['AI', '工程实践'],
    excerpt: 'PRD → 技术设计 → AGENTS.md → 实现 → 测试部署，五步走让 AI 真正成为你的队友。',
  },
  {
    slug: 'css-paper-design',
    title: '纸感设计的温度：CSS 造出「墨纸森系」',
    date: '2026-08-15',
    tags: ['CSS', '设计'],
    excerpt: '从噪点纹理到衬线排版，聊聊如何用纯 CSS 打造有质感的轻量视觉风格。',
  },
]

export interface PostContent {
  meta: PostMeta
  raw: string
}

const modules = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export function getPost(slug: string): PostContent | undefined {
  const meta = postIndex.find((p) => p.slug === slug)
  if (!meta) return undefined
  const key = Object.keys(modules).find((k) => k.includes(`/${meta.slug}.md`))
  if (!key) return undefined
  return { meta, raw: modules[key] }
}

export function listPosts(): PostContent[] {
  return postIndex
    .map((meta) => getPost(meta.slug))
    .filter((p): p is PostContent => Boolean(p))
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1))
}
