import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import Contact from './components/Contact'
import Footer from './components/Footer'

/** 极简 hash 路由：#/post/<slug> 渲染博客详情，其余渲染首页 */
function parseHash(): string | null {
  const hash = window.location.hash
  const m = hash.match(/^#\/post\/([^/]+)/)
  return m ? decodeURIComponent(m[1]) : null
}

export default function App() {
  const [postSlug, setPostSlug] = useState<string | null>(() => parseHash())

  useEffect(() => {
    const onHash = () => {
      const slug = parseHash()
      setPostSlug(slug)
      if (!slug) {
        // 回到首页锚点时滚动到对应区块
        const target = window.location.hash.replace(/^#/, '')
        if (target && target !== '/') {
          setTimeout(() => {
            document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
          }, 50)
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const openPost = (slug: string) => {
    window.location.hash = `/post/${slug}`
    setPostSlug(slug)
  }

  const backHome = () => {
    window.location.hash = '/'
    setPostSlug(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (postSlug) {
    return (
      <>
        <Navbar />
        <BlogPost slug={postSlug} onBack={backHome} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog onOpenPost={openPost} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
