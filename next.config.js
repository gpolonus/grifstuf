
const { getBlogPosts } = require('./src/services/Data')

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

const exportPathMap = async () => {
  const blogPostPages = (await getBlogPosts()).reduce((ac, {path}) => ({
    ...ac,
    [`/blog/${path}`]: { page: "/blog/[blog]" }
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
  exportPathMap,
})
