
// import unfetch from 'isomorphic-unfetch'
const fetch = require('isomorphic-unfetch')

let data
const anyjsonURL = '//api.anyjsoncms.com/entries'
const API_KEY = process.env.ANY_JSON_API_KEY || '3d6addb92fbfbab5c1000d03d48ea0c77deff207'
// const API_KEY = process.env.ANY_JSON_API_KEY
// console.log('API_KEY', API_KEY)

const BLOG_POST_TYPE = 'blogPost'
const STUF_TYPE = 'stuf'

const models = {
  [BLOG_POST_TYPE]: '5e44415052269b0bda9aa20b',
  [STUF_TYPE]: '5e443f2552269b0bda9aa20a'
}

const fetchData = async () => {
  const response = await fetch(anyjsonURL, {
    headers: {
      'ApiKey': API_KEY
    }
  })
  console.log('status', response.status)
  return await response.json()
}

const processRaw = (raw) => {
  const processMap = {
    [models.blogPost]: processBlog,
    [models.stuf]: processStuf
  }
  return raw.map(r => processMap[r.modelId] && processMap[r.modelId](r))
}

const processBlog = ({ id, value: {
    blog_post_content,
    blog_post_title,
    blog_post_path
  }}) => ({
  id,
  content: blog_post_content,
  title: blog_post_title,
  path: blog_post_path,
  type: BLOG_POST_TYPE
})

const processStuf = ({ id, value: { stuf_desc, stuf_link, stuf_title } }) => ({
  id,
  description: stuf_desc,
  url: stuf_link,
  title: stuf_title,
  type: STUF_TYPE
})

const getBlogPosts = async () => (await getData()).filter(t => t.type === BLOG_POST_TYPE)

const getStuf = async () => (await getData()).filter(t => t.type === STUF_TYPE)

const getData = async () => {
  if(!data) {
    const raw = await fetchData()
    data = processRaw(raw)
  }

  return data
}

module.exports = {
  getBlogPosts,
  getStuf,
  getData
}
