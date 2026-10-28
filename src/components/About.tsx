import { profile } from '../data/profile'
import Reveal from './Reveal'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="section-index">01</span>
            <h2 className="section-title">关于我</h2>
            <span className="section-line" />
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal delay="d1">
            <div className="about-text">
              {profile.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay="d2">
            <div className="timeline">
              {profile.timeline.map((item) => (
                <div className="timeline-item" key={item.title}>
                  <span className="timeline-dot" />
                  <p className="timeline-time">{item.time}</p>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
