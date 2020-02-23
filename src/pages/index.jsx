
import React from 'react'
import Link from 'next/link'
import { getBlogPosts } from '../services/data'

const getInitialProps = async () => {
  const posts = await getBlogPosts()
  const featuredPosts = posts.filter(p => p.featured)
  return { featuredPosts }
}

const Index = ({ featuredPosts = [] }) => (
  <div className="landing-contents">
    <h1>
      GRIFSTUF
    </h1>
    <div>
      <h2>Blog Posts</h2>
      <ul className="basic-list basic-list--flat">
      {
        featuredPosts.map(({ title, path }) => (
          <li key={path}>
            <Link href={`/blog/${path}`}>
              <a>
                { title }
              </a>
            </Link>
          </li>
        ))
      }
      </ul>
    </div>
  </div>
)

Index.getInitialProps = getInitialProps

export default Index
