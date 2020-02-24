
require('dotenv').config()
const { getBlogPosts } = require('./src/services/data-iso')
const { getStufMetdata } = require('./src/services/stuf-metadata-be')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

const exportPathMap = async () => {
  const blogPostPages = (await getBlogPosts()).reduce((ac, { path }) => ({
    ...ac,
    [`/blog/${ path }`]: { page: `/blog/[blog]`, query: { blog: path } }
  }), {})

  const stufPages = getStufMetdata().reduce((ac, { title, path }) => ({
    ...ac,
    [`/stuf/${ path }`]: { page: `/stuf/${ path }` }
  }), {})

  return {
    '/': { page: '/' },
    '/lippy': { page: '/lippy' },
    '/about': { page: '/about' },
    '/blog': { page: '/blog' },
    ...blogPostPages,
    '/stuf': { page: '/stuf' },
    ...stufPages,
  }
}

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  env: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    SPACE_ID: process.env.SPACE_ID
  },
  exportPathMap,
})
