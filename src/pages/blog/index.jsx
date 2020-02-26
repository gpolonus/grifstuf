
import React from 'react'
import Link from 'next/link'
import { getBlogPosts } from '../../services/data-iso'

const getInitialProps = async () => {
  const posts = await getBlogPosts()
  return { posts }
}

const BlogIndex = ({ posts }) => (
  <div className="blog text-contents">
    <h1>Blog</h1>
    {
      posts.map(({ title, path }) => (
        <h2 key={path}>
          <Link href={`/blog/${ path }`}>
            <a>
              { title }
            </a>
          </Link>
        </h2>
      ))
    }
  </div>
)

BlogIndex.getInitialProps = getInitialProps

export default BlogIndex