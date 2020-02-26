
import React from 'react'
import getStuf from '../../services/stuf-fe'
import Link from 'next/link'

export default () => {
  return (
    <>
      <div className="text-contents">
        <h1>Stuf</h1>
        <ul className="basic-list">
          {
            getStuf().map(({ title, path }) => (
              <li key={title}>
                <Link href="/stuf/[stuf]" as={`/stuf/${ path }`}>
                  <a>
                    <h2>
                      { title }
                    </h2>
                  </a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}