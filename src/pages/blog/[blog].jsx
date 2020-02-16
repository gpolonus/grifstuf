
import React from 'react'
import { useRouter } from 'next/router'
import { getBlogPosts } from '../../services/Data'
import MarkDown from 'react-markdown'

async function getInitialProps() {
  const posts = await getBlogPosts()
  return { posts }
}

const Post = ({ posts }) => {
  const router = useRouter()
  const postPath = router.query.blog
  const { content } = posts.find(({ path }) => path === postPath)
  return (
    <div className="blog-post text-contents">
      <MarkDown source={content} />
    </div>
  )
}

Post.getInitialProps = getInitialProps

export default Post
