
import React from 'react'
import Link from 'next/link'
import { getBlogPosts } from '../services/data-iso'
import getStuf from '../services/stuf-fe'

const getInitialProps = async () => {
  const posts = await getBlogPosts()
  const featuredPosts = posts.filter(p => p.featured)
  const featuredStuf = getStuf().filter(({ featured }) => featured)
  return { featuredPosts, featuredStuf }
}

const Index = ({ featuredPosts = [], featuredStuf = [] }) => (
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
      <h2>Stuf</h2>
      <p>On this site I call <strong>stuf</strong> any project, app, or interactive canvas page I have made.</p>
      <ul className="basic-list basic-list--flat">
      {
        featuredStuf.map(({ title, path }) => (
          <li key={path}>
            <Link href={`/stuf/${path}`}>
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
