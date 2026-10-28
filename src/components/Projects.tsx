import { useState } from 'react'
import { projects, type Project } from '../data/projects'
import Reveal from './Reveal'

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="project-card" onClick={() => onOpen(project)} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(project) }}
      aria-label={`查看项目：${project.title}`}
    >
      <div className="project-cover" style={{ background: project.coverBg }}>
        {project.cover}
      </div>
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-tags">
          {project.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <div className="project-links">
          {project.demo && (
            <a href={project.demo} onClick={(e) => e.stopPropagation()}>
              在线体验 ↗
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
              源码 ↗
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="section-index">03</span>
            <h2 className="section-title">项目</h2>
            <span className="section-line" />
          </div>
        </Reveal>

        <div className="project-grid">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={`d${(i % 3) + 1}` as 'd1'}>
              <ProjectCard project={p} onOpen={setActive} />
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <div className="modal-mask" onClick={() => setActive(null)} role="dialog" aria-modal="true">
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="关闭" onClick={() => setActive(null)}>
              ✕
            </button>
            <h3>{active.title}</h3>
            <p className="modal-desc">{active.desc}</p>
            <div className="project-tags">
              {active.tags.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <p className="modal-meta">
              {active.demo && <a href={active.demo}>在线体验 ↗</a>}
              {active.repo && (
                <>
                  {' · '}
                  <a href={active.repo} target="_blank" rel="noreferrer">源码 ↗</a>
                </>
              )}
            </p>
            <ul>
              {active.detail.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
