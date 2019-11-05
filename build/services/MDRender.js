// const showdown  = require('showdown')
// const converter = new showdown.Converter()

const md  = require('markdown-it')()

// const mdrender = (contents) => {
//   return converter.makeHtml(s)
// }

const mdrender = (contents) => {
  const rendered = md.render(contents)
  return rendered
}

module.exports = {
  mdrender
}
