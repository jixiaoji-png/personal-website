import { profile } from '../data/profile'

function Leaf({ className }: { className: string }) {
  return (
    <svg className={`leaf-deco ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 8 C52 18 56 44 32 60 C14 46 14 20 32 8 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path d="M32 12 C32 32 30 46 30 56" stroke="currentColor" strokeWidth="1.6" />
      <path d="M22 26 C26 24 30 23 34 24 M22 40 C27 37 32 35 37 35" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div>
          <p className="hero-eyebrow">—— 欢迎来到我的小岛</p>
          <h1 className="hero-title">
            你好，我是
            <br />
            <span className="accent">{profile.name}</span>
          </h1>
          <p className="hero-sub">{profile.role}</p>
          <p className="hero-desc">{profile.slogan}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">
              看看项目
            </a>
            <a className="btn btn-ghost" href="#contact">
              联系我
            </a>
          </div>
        </div>

        <div className="hero-seal" aria-hidden="true">
          <Leaf className="l1" />
          <Leaf className="l2" />
          <div className="seal">
            <span className="seal-main">青屿</span>
            <span className="seal-sub">QING YU · 2026</span>
          </div>
        </div>
      </div>
      <p className="hero-hint">▼ 向下滑动，慢慢逛</p>
    </section>
  )
}
