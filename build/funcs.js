
const fs = require('fs');
const path = require('path');

const log = function(...things) {
  if(things.length === 1) {
    console.log(JSON.stringify(things[0]))
  } else {
  console.log(JSON.stringify(things))
  }
}

const getContents = function(filePath) {
  return new Promise(resolve => {
    fs.readFile(filePath, function(err, buf) {
      if(err) {
        console.log(`Error reading in file contents: ${err}`);
        resolve(err);
      }
      const contents = buf.toString()
      resolve(contents)
    })
  })
}

function getContentsSync(filePath) {
  const buf = fs.readFileSync(filePath)
  return buf.toString()
}

function writeContents(filePath, contents) {
  return new Promise(resolve => {
    fs.mkdir(path.dirname(filePath), { recursive: true}, err => {
      if(err) {
        return console.log(err);
      }
      fs.writeFile(filePath, contents, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log(`${filePath} was saved!`);
        resolve(null)
      })
    })
  })
}

async function readThenWriteContents(source, destination, cb) {
  let contents = await getContents(source)
  contents = cb(contents)
  writeContents(destination, contents)
}

const getJSON = async (filePath) => {
  const contents = await getContents(filePath)
  return JSON.parse(contents)
}

const logUsage = () => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
}

const getArgs = () => {
  return process.argv.slice(2)
}

function getPartialsSync(partials, partialPath = '.') {
  return partials.reduce((ac, p) => ({
    ...ac,
    [p]: getContentsSync(`${partialPath}/${p}.mustache`)
  }), {})
}

function getFile(path, lambda = d => d) {
  let file
  return async function() {
    if(file) {
      return file
    } else {
      file = lambda(await getContents(path))
      return file
    }
  }
}

function getJSONFile(path, lambda = d => d) {
  let file
  return async function() {
    if(file) {
      return file
    } else {
      file = lambda(await getJSON(path))
      return file
    }
  }
}

module.exports = {
  log,
  getContents,
  getJSON,
  logUsage,
  getArgs,
  readThenWriteContents,
  getPartialsSync,
  writeContents,
  getFile,
  getJSONFile
}