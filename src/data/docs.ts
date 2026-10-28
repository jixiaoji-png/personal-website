// 项目文档通过 Vite import.meta.glob 加载项目根目录的 Markdown 文件。
// 三份正式文档：PRD.md / TECH_DESIGN.md / AGENTS.md，与网站同目录维护。

export interface DocMeta {
  slug: string
  file: string
  title: string
  date: string
  desc: string
  tag: string
}

export const docIndex: DocMeta[] = [
  {
    slug: 'prd',
    file: 'PRD.md',
    title: 'PRD · 产品需求文档',
    date: '2026-10-28',
    desc: '产品概述、用户场景、功能需求清单、界面设计、非功能性需求与验收标准。',
    tag: '产品',
  },
  {
    slug: 'tech-design',
    file: 'TECH_DESIGN.md',
    title: 'TECH_DESIGN · 技术设计文档',
    date: '2026-10-28',
    desc: '技术栈选型、项目结构、数据模型、关键实现与性能约束说明。',
    tag: '技术',
  },
  {
    slug: 'agents',
    file: 'AGENTS.md',
    title: 'AGENTS.md · AI 协作项目说明',
    date: '2026-10-28',
    desc: '面向 AI 协作开发的项目说明：技术约定、常用命令、开发规范与验收要求。',
    tag: '规范',
  },
]

export const projectInfo = {
  name: '青屿 QINGYU · 个人展示网站',
  version: 'v1.0 (MVP)',
  updated: '2026-10-28',
}

export interface DocContent {
  meta: DocMeta
  raw: string
}

// src/data/ 向上两级 = 项目根目录，加载 PRD.md / TECH_DESIGN.md / AGENTS.md
const modules = import.meta.glob('../../*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export function getDoc(slug: string): DocContent | undefined {
  const meta = docIndex.find((d) => d.slug === slug)
  if (!meta) return undefined
  const key = Object.keys(modules).find((k) => (k.split(/[\\/]/).pop() || '') === meta.file)
  if (!key) return undefined
  return { meta, raw: modules[key] }
}

export function listDocs(): DocContent[] {
  return docIndex
    .map((meta) => getDoc(meta.slug))
    .filter((d): d is DocContent => Boolean(d))
}
