
const contentful = require('contentful')
const mo = require('../utils/mo.js')

const getClient = () => {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN
  const SPACE_ID = process.env.SPACE_ID

  return contentful.createClient({
    accessToken: ACCESS_TOKEN,
    space: SPACE_ID
  })
}

const fetchEntries = (query = {}, client = getClient()) => async () =>
  await client.getEntries(query)

const fetchEntriesOfType = type => fetchEntries({ 'content_type': type })

const fetchBlogPosts = fetchEntriesOfType('blogPost')

const processBlogPosts = ({ items }) => (
  items.map(
    ({ fields }) => ({
      ...fields,
      type: 'blogPost'
    })
  )
)

const getBlogPosts = mo(async () => (
  processBlogPosts(await fetchBlogPosts())
))

module.exports = {
  fetchBlogPosts,
  getBlogPosts,
}
