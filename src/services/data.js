
const { getBlogPosts: gbp } = require('../utils/data')

let blogPosts

const getBlogPosts = async () => {
  if(!blogPosts) {
    blogPosts = await gbp()
  }
  return blogPosts
}

module.exports = {
  getBlogPosts
}
