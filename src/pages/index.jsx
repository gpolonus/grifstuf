
import React from 'react'
import Link from 'next/link'

const featuredPosts = [
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
  <div className="landing-contents">
    <h1>
      grifstuf
    </h1>
    <div>
      <h2>latest blog posts</h2>
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

    <div>
      <h2>stuf and things</h2>
      <p>Someday soon there will be stuf here.</p>
    </div>
  </div>
)
