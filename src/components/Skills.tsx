import { useEffect, useRef } from 'react'
import { skills } from '../data/skills'
import Reveal from './Reveal'

function SkillCard({ cat, items }: { cat: string; items: { name: string; level: number }[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.querySelectorAll<HTMLElement>('.skill-fill').forEach((bar) => {
              const target = Number(bar.dataset.level || '0')
              bar.style.width = `${target}%`
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="skill-card" ref={ref}>
      <h3 className="skill-cat">{cat}</h3>
      {items.map((item) => (
        <div className="skill-item" key={item.name}>
          <div className="skill-top">
            <span className="skill-name">{item.name}</span>
            <span className="skill-level">{item.level}%</span>
          </div>
          <div className="skill-bar">
            <div className="skill-fill" data-level={item.level} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="section-index">02</span>
            <h2 className="section-title">技能</h2>
            <span className="section-line" />
          </div>
        </Reveal>

        <div className="skill-grid">
          {skills.map((s, i) => (
            <Reveal key={s.cat} delay={`d${(i % 3) + 1}` as 'd1'}>
              <SkillCard cat={s.cat} items={s.items} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
