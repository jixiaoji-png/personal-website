import { useEffect, useMemo } from 'react'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { docIndex, getDoc, projectInfo } from '../data/docs'

interface DocPageProps {
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

export default function DocPage({ slug, onBack }: DocPageProps) {
  const doc = useMemo(() => getDoc(slug), [slug])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  const goDoc = (next: string) => {
    if (next !== slug) {
      window.location.hash = `/docs/${next}`
    }
  }

  return (
    <div className="doc-shell">
      <aside className="doc-sidebar">
        <a
          className="doc-brand"
          href="#top"
          onClick={(e) => { e.preventDefault(); onBack() }}
        >
          <span className="doc-brand-mark">屿</span>
          <span className="doc-brand-text">
            <strong>青屿 QINGYU</strong>
            <small>项目文档</small>
          </span>
        </a>

        <nav className="doc-nav" aria-label="项目文档导航">
          {docIndex.map((d) => (
            <a
              key={d.slug}
              className={`doc-nav-item ${d.slug === slug ? 'active' : ''}`}
              href={`#/docs/${d.slug}`}
              onClick={(e) => { e.preventDefault(); goDoc(d.slug) }}
              aria-current={d.slug === slug ? 'page' : undefined}
            >
              <span className="doc-nav-file">{d.file}</span>
              <span className="doc-nav-title">{d.title}</span>
            </a>
          ))}
        </nav>

        <div className="doc-sidebar-foot">
          <button type="button" className="doc-back" onClick={onBack}>
            ← 返回首页
          </button>
        </div>
      </aside>

      <main className="doc-main">
        {doc ? (
          <>
            <div className="doc-meta-card">
              <div className="doc-meta-item">
                <span className="doc-meta-label">项目</span>
                <span className="doc-meta-value">{projectInfo.name}</span>
              </div>
              <div className="doc-meta-item">
                <span className="doc-meta-label">版本</span>
                <span className="doc-meta-value">{projectInfo.version}</span>
              </div>
              <div className="doc-meta-item">
                <span className="doc-meta-label">更新日期</span>
                <span className="doc-meta-value">{projectInfo.updated}</span>
              </div>
              <div className="doc-meta-item">
                <span className="doc-meta-label">当前文档</span>
                <span className="doc-meta-value">{doc.meta.file}</span>
              </div>
            </div>

            <h1 className="doc-title">{doc.meta.title}</h1>
            <p className="doc-desc">{doc.meta.desc}</p>

            <div
              className="doc-content post-content"
              dangerouslySetInnerHTML={{ __html: marked.parse(doc.raw) as string }}
            />
          </>
        ) : (
          <div className="doc-empty">
            <p>文档不存在。</p>
            <button type="button" className="btn btn-primary" onClick={onBack}>
              返回首页
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
