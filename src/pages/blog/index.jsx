
import React from 'react'
import Link from 'next/link'

const blogPosts = [
  {
    title: "This Site's Stack",
    path: "this-sites-stack"
  },
  {
    title: "Potato Scripts",
    path: "potato-scripts"
  },
  // {
  //   title: "Picking a JavaScript Framework",
  //   path: "js-frameworks"
  // }
]

export default () => (
  <div className="blog text-contents">
    <h1>grifstuf blog</h1>
    {
      blogPosts.map(({ title, path }) => (
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