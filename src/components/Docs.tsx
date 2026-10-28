import { listDocs } from '../data/docs'
import Reveal from './Reveal'

interface DocsProps {
  onOpenDoc: (slug: string) => void
}

export default function Docs({ onOpenDoc }: DocsProps) {
  const docs = listDocs()

  return (
    <section className="section" id="docs">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="section-index">06</span>
            <h2 className="section-title">文档</h2>
            <span className="section-line" />
          </div>
        </Reveal>

        <p className="docs-intro">
          这个项目的完整开发资料：产品需求、技术设计与 AI 协作规范。点击卡片即可在线阅读。
        </p>

        <div className="docs-grid">
          {docs.map((doc, i) => (
            <Reveal key={doc.meta.slug} delay={`d${(i % 3) + 1}` as 'd1'}>
              <a
                className="doc-card"
                href={`#/docs/${doc.meta.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  onOpenDoc(doc.meta.slug)
                }}
              >
                <span className="doc-card-tag">{doc.meta.tag}</span>
                <h3 className="doc-card-title">{doc.meta.title}</h3>
                <p className="doc-card-desc">{doc.meta.desc}</p>
                <span className="doc-card-more">打开文档 ↗</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
