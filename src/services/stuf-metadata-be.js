
const fs = require('fs')
const mo = require('../utils/mo')

const getStufMetdata = mo(() => (
  fs.readdirSync('./src/pages/stuf')
    .filter(fileName => fileName !== 'index.jsx')
    .map(fileName => fileName.split('.')[0])
    .map(name => ({
      path: name
    }))
))

module.exports = {
  getStufMetdata
}
