import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import Docs from './components/Docs'
import DocPage from './components/DocPage'
import Contact from './components/Contact'
import Footer from './components/Footer'

/** 极简 hash 路由：#/post/<slug> 博客详情；#/docs/<slug> 文档详情；其余渲染首页 */
type Route =
  | { type: 'post'; slug: string }
  | { type: 'doc'; slug: string }
  | null

function parseHash(): Route {
  const hash = window.location.hash
  let m = hash.match(/^#\/post\/([^/]+)/)
  if (m) return { type: 'post', slug: decodeURIComponent(m[1]) }
  m = hash.match(/^#\/docs\/([^/]+)/)
  if (m) return { type: 'doc', slug: decodeURIComponent(m[1]) }
  return null
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseHash())

  useEffect(() => {
    const onHash = () => {
      const next = parseHash()
      setRoute(next)
      if (!next) {
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
    setRoute({ type: 'post', slug })
  }

  const openDoc = (slug: string) => {
    window.location.hash = `/docs/${slug}`
    setRoute({ type: 'doc', slug })
  }

  const backHome = () => {
    window.location.hash = '/'
    setRoute(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (route?.type === 'post') {
    return (
      <>
        <Navbar />
        <BlogPost slug={route.slug} onBack={backHome} />
        <Footer />
      </>
    )
  }

  if (route?.type === 'doc') {
    return (
      <>
        <Navbar />
        <DocPage slug={route.slug} onBack={backHome} />
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
        <Docs onOpenDoc={openDoc} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
