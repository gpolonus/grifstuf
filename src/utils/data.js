
const contentful = require('contentful')

const getClient = () => {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN
  const SPACE_ID = process.env.SPACE_ID

  return contentful.createClient({
    accessToken: ACCESS_TOKEN,
    space: SPACE_ID
  })
}

const fetchEntriesOfType =
  type =>
    async (client = getClient()) =>
      await client.getEntries({ 'content_type': type })

const fetchBlogPosts = fetchEntriesOfType('blogPost')

const fetchStuf = fetchEntriesOfType('stuf')

const processBlogPosts =
  ({ items }) =>
    items.map(
      ({ fields }) => ({
        ...fields,
        type: 'blogPost'
      })
    )

const getBlogPosts =
  async () =>
    processBlogPosts(await fetchBlogPosts())

const getStuf =
  async () =>
    processStuf(await fetchStuf())

/**
 * @TODO Refactor this to not make two requests
 */
const getData = async () => ([
  ...(await fetchBlogPosts()),
  ...(await fetchStuf()),
])

module.exports = {
  fetchBlogPosts,
  getBlogPosts,
  getStuf,
  getData
}
