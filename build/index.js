
process.chdir('./build')
const Mustache = require('mustache')
const mdrender = require('./services/MDRender').mdrender
const { getContents, writeContents, getJSONFile, getFile } = require('./funcs')

// Base View and File Locations

const dataFile = '../data.json'
const getView = getJSONFile(dataFile, data => ({
  ...data,
  mdrender: () => (contents, render) => {
    const rendered = render(contents)
    const mdrendered = mdrender(rendered)
    return mdrendered
  }
}))

const indexFile = '../src/index.mustache'
const getIndexTemplate = getFile(indexFile)

const pagesPath = '../src/pages'

const releaseFolder = '../public'

// Building main page
const mainTemplateFile = `${pagesPath}/main.mustache`
const indexBuildFile = `${releaseFolder}/index.html`

// Building Blog Pages
const blogPostsTemplateFile = `${pagesPath}/blogPosts.mustache`
const blogTemplateFile = `${pagesPath}/blog.mustache`
const blogsPath = '../src/blog'
const blogTitle = title => `Blog | ${title}`
const blogBuildPath = `${releaseFolder}/blog`
const blogPostBuildFile = file => `${blogBuildPath}/${file}/index.html`
const blogBuildFile = `${releaseFolder}/blog/index.html`

// Building Stuf Pages


// Rendering functions
async function renderPage(content, title, view = {}, css = '', partials = {}) {
  const indexTemplate = await getIndexTemplate()

  const defaultView = await getView()
  view = {
    ...view,
    css,
    title,
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
  const bt = await getContents(blogTemplateFile)
  const blogIndex = await renderPage(bt, 'blog', defaultView, 'blog')
  await writeContents(blogBuildFile, blogIndex)
}

async function renderBlogs() {
  const defaultView = await getView()

  const bt = await getContents(blogPostsTemplateFile)

  defaultView.blogPosts.forEach(async ({ title, file }) => {
    const contents = await getContents(`${blogsPath}/${file}.md`)
    const bView = {
      ...defaultView,
      contents,
    }
    const blogPage = await renderPage(bt, blogTitle(title), bView, 'blog')
    await writeContents(blogPostBuildFile(file), blogPage)
  });
}

async function renderStuf() {

}

async function createPage(file, template, title, css = '', view = {}) {
  const contents = await renderPage(template, title, css, view)
  await writeContents(file, contents)
}

async function run() {
  await renderMain()
  await renderBlogIndex()
  await renderBlogs()
  await renderStuf()

  // Build Basic Pages
  const defaultView = await getView()
  defaultView.pages.forEach(async page => {
    const templatePath = `${pagesPath}/${page}.mustache`
    const buildPath = `${releaseFolder}/${page}/index.html`
    const template = await getContents(templatePath)
    createPage(buildPath, template, page)
  })
}

run()

