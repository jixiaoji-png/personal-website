import { useEffect, useMemo } from 'react'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { getPost, type PostMeta } from '../data/posts'

interface BlogPostProps {
  slug: string
  onBack: () => void
}

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return hljs.highlightAuto(code).value
    },
  }),
)
marked.setOptions({ gfm: true, breaks: false })

export default function BlogPost({ slug, onBack }: BlogPostProps) {
  const post = useMemo(() => getPost(slug), [slug])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  if (!post) {
    return (
      <div className="post-page container">
        <a className="post-back" href="#blog" onClick={(e) => { e.preventDefault(); onBack() }}>
          ← 返回博客
        </a>
        <h1 style={{ fontFamily: 'var(--font-serif)' }}>文章不存在</h1>
      </div>
    )
  }

  const { meta, raw } = post
  const html = marked.parse(raw) as string

  // 生成简易 TOC
  const tocLines: { level: number; text: string }[] = []
  const temp = document.createElement('div')
  temp.innerHTML = html
  temp.querySelectorAll('h2, h3').forEach((h) => {
    tocLines.push({ level: Number(h.tagName[1]), text: h.textContent || '' })
  })

  const renderMeta = (m: PostMeta) => (
    <div className="post-meta-big">
      <span>{m.date}</span>
      {m.tags.map((t) => (
        <span key={t}>#{t}</span>
      ))}
    </div>
  )

  return (
    <div className="post-page container">
      <a className="post-back" href="#blog" onClick={(e) => { e.preventDefault(); onBack() }}>
        ← 返回博客
      </a>
      <h1>{meta.title}</h1>
      {renderMeta(meta)}

      {tocLines.length > 0 && (
        <div className="post-toc">
          <strong>目录</strong>
          <ul>
            {tocLines.map((l, i) => (
              <li key={i} style={{ paddingLeft: (l.level - 2) * 16 }}>
                <a href={`#/post/${meta.slug}`} onClick={(e) => e.preventDefault()}>{l.text}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
