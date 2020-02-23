
const { getBlogPosts } = require('./src/utils/data')
require('dotenv').config()

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

const exportPathMap = async () => {
  const blogPostPages = (await getBlogPosts()).reduce((ac, { path }) => ({
    ...ac,
    [`/blog/${ path }`]: { page: `/blog/[blog]`, query: { blog: path } }
  }), {})

  return {
    '/': { page: '/' },
    '/blog': { page: '/blog' },
    '/lippy': { page: '/lippy' },
    '/about': { page: '/about' },
    ...blogPostPages,
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
