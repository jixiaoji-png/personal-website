import { useState } from 'react'

const links = [
  { href: '#about', label: '关于' },
  { href: '#skills', label: '技能' },
  { href: '#projects', label: '项目' },
  { href: '#blog', label: '博客' },
  { href: '#contact', label: '联系' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const handleNav = () => setOpen(false)

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="nav-logo" href="#top" onClick={handleNav}>
          <span className="nav-logo-mark">屿</span>
          青屿
        </a>

        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={handleNav}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
