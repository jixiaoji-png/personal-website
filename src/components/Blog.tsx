import { listPosts } from '../data/posts'
import Reveal from './Reveal'

interface BlogProps {
  onOpenPost: (slug: string) => void
}

export default function Blog({ onOpenPost }: BlogProps) {
  const posts = listPosts()

  return (
    <section className="section" id="blog">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <span className="section-index">04</span>
            <h2 className="section-title">博客</h2>
            <span className="section-line" />
          </div>
        </Reveal>

        <div className="post-list">
          {posts.map((post) => (
            <Reveal key={post.meta.slug} delay="d1">
              <a
                className="post-item"
                href={`#/post/${post.meta.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  onOpenPost(post.meta.slug)
                }}
              >
                <div className="post-meta">
                  <span className="post-date">{post.meta.date}</span>
                  {post.meta.tags.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>
                <h3 className="post-title">{post.meta.title}</h3>
                <p className="post-excerpt">{post.meta.excerpt}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
