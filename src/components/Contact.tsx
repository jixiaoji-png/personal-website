import { useState, type FormEvent } from 'react'
import Reveal from './Reveal'

type Feedback = { type: 'ok' | 'err'; text: string } | null

export default function Contact() {
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@qingyu.dev')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()

    if (!name || !email || !message) {
      setFeedback({ type: 'err', text: '请填写完整的姓名、邮箱与留言内容。' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback({ type: 'err', text: '邮箱格式不正确，请检查后重试。' })
      return
    }
    // 静态站演示：模拟提交成功
    setFeedback({ type: 'ok', text: `收到！${name}，我会尽快通过 ${email} 联系你。` })
    form.reset()
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="section-index">05</span>
            <h2 className="section-title">联系</h2>
            <span className="section-line" />
          </div>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay="d1">
            <div className="contact-info">
              <p>无论是工作机会、技术交流，还是单纯想聊聊代码与生活，都欢迎写信给我。</p>
              <div className="contact-line">
                <span className="label">邮箱</span>
                <span className="copyable" onClick={handleCopy} title="点击复制">
                  hello@qingyu.dev
                </span>
                <span style={{ fontSize: 12, color: 'var(--caramel)' }}>{copied ? '已复制 ✓' : ''}</span>
              </div>
              <div className="contact-line">
                <span className="label">坐标</span>
                <span>中国 · 杭州</span>
              </div>
              <div className="contact-line">
                <span className="label">状态</span>
                <span>开放合作中</span>
              </div>
              <div className="social-links">
                <a href="https://github.com/example/qingyu" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://example.com" target="_blank" rel="noreferrer">掘金</a>
                <a href="https://example.com" target="_blank" rel="noreferrer">小红书</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay="d2">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="name">姓名</label>
                <input className="input" id="name" name="name" placeholder="怎么称呼你？" />
              </div>
              <div className="form-field">
                <label htmlFor="email">邮箱</label>
                <input className="input" id="email" name="email" type="email" placeholder="you@example.com" />
              </div>
              <div className="form-field">
                <label htmlFor="message">留言</label>
                <textarea className="textarea" id="message" name="message" rows={5} placeholder="想对我说点什么？" />
              </div>
              <button type="submit" className="btn btn-primary">
                发送留言
              </button>
              {feedback && (
                <p className={`form-feedback ${feedback.type}`} role="status">
                  {feedback.text}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
