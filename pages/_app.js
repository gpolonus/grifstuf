import React from 'react'
import Link from 'next/link'
import './index.css'

const links = [
  // {
  //   path: 'stuf',
  //   title: 'stuf'
  // },
  {
    path: 'blog',
    title: 'blog'
  },
  {
    path: 'about',
    title: 'about'
  },
  {
    path: 'lippy',
    title: 'lippy'
  }
]

export default ({ Component, pageProps }) => (
  <>
    <nav>
      <ul>
        <li>
          <Link href="/">
            <a>home</a>
          </Link>
        </li>
        {
          links.map(({ path, title }) => (
            <li key={path}>
              <Link href={`/${path}`}>
                <a>{ title }</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </nav>
    <div className="main">
      <Component {...pageProps} />
      <footer>
      © Griffin Polonus. All rights reserved.
      </footer>
    </div>
  </>
)
