import React from 'react'
import Nav from '../components/Nav'
import './index.css'

export default ({ Component, pageProps }) => (
  <>
    <title>
      grifstuf
    </title>
    <Nav />
    <div className="main">
      <Component {...pageProps} />
      <footer>
      © Griffin Polonus. All rights reserved.
      </footer>
    </div>
  </>
)
