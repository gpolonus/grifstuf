import React from 'react'
import Link from 'next/link'

const links = [
  {
    path: '',
    title: 'Home'
  },
  {
    path: 'stuf',
    title: 'Stuf'
  },
  {
    path: 'blog',
    title: 'Blog'
  },
  {
    path: 'about',
    title: 'About'
  },
  {
    path: 'lippy',
    title: 'Lippy'
  }
]

export default () => (
  <nav>
    <img className="lippy" src="/images/lippy-original-square_100x100.jpg" />
    <ul>
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
)