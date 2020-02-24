
import React from 'react'
import getStuf from '../../services/stuf-fe'
import Link from 'next/link'

export default () => {
  return (
    <>
      <h1>Stuf</h1>
      <ul>
        {
          Object.values(getStuf()).map(({ attributes: { title, path } }) => (
            <li key={title}>
              <Link href="/stuf/[stuf]" as={`/stuf/${ path }`}>
                <h2>
                  { title }
                </h2>
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}