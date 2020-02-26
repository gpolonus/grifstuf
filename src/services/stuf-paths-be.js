
const fs = require('fs')
const mo = require('../utils/mo')

const getStufPaths = mo(() => (
  fs.readdirSync('./src/pages/stuf')
    .filter(fileName => fileName !== 'index.jsx' && !fileName.startsWith('_'))
    .map(fileName => fileName.split('.')[0])
    .map(name => ({
      path: name
    }))
))

module.exports = {
  getStufPaths
}
