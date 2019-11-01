
process.chdir('./build')
const Mustache = require('mustache')
const showdown  = require('showdown')
const converter = new showdown.Converter()
const { getContents, writeContents, getJSONFile, getFile } = require('./funcs')

// Base View and Templates
const dataFile = '../data.json'
const getView = getJSONFile(dataFile)

const indexFile = '../src/index.mustache'
const getIndexTemp = getFile(indexFile)

const pagesPath = '../src/pages'

const releaseFolder = 'public'

// Building main page
const mainTemplateFile = `${pagesPath}/main.mustache`
const indexBuildFile = `../${releaseFolder}/index.html`

// Building Blog Pages
const blogPostsTemplateFile = `${pagesPath}/blogPosts.mustache`
const blogTemplateFile = `${pagesPath}/blog.mustache`
const blogsPath = '../src/blog'
const blogTitle = title => `Blog | ${title}`
const blogBuildPath = `../${releaseFolder}/blog`
const blogPostBuildFile = file => `${blogBuildPath}/${file}.html`
const blogBuildFile = `../${releaseFolder}/blog/index.html`

// Building Stuf Pages

async function renderPage(content, view = {}, partials = {}) {
  const indexTemplate = await getIndexTemp()

  const defaultView = await getView()
  view = {
    ...view,
    ...defaultView
  }

  return Mustache.render(indexTemplate, view, { ...partials, content })
}

async function renderMain() {
  const mt = await getContents(mainTemplateFile)
  const main = await renderPage(mt)
  await writeContents(indexBuildFile, main)
}

async function renderBlogIndex() {
  const defaultView = await getView()
  const view = {
    ...defaultView,
    title: 'blog',
    css: 'blog'
  }
  const bt = await getContents(blogTemplateFile)
  const blogIndex = await renderPage(bt, view)
  await writeContents(blogBuildFile, blogIndex)
}

async function renderBlogs() {
  const defaultView = await getView()

  const mdrender = (contents, render) => {
    return converter.makeHtml(render(contents))
  }

  const view = {
    ...defaultView,
    mdrender: () => mdrender,
    css: 'blog'
  }

  const bt = await getContents(blogPostsTemplateFile)

  defaultView.blogPosts.forEach(async ({ title, file }) => {
    const contents = await getContents(`${blogsPath}/${file}.md`)
    const bView = {
      ...view,
      contents,
      title: blogTitle(title)
    }
    const blogPage = await renderPage(bt, bView)
    await writeContents(blogPostBuildFile(file), blogPage)
  });
}

async function renderStuf() {

}

async function run() {
  await renderMain()
  await renderBlogIndex()
  await renderBlogs()
  await renderStuf()
}

run()

