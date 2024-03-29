
const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, 'doodles2.yaml')
const yaml = require('yaml')

const payload = require('payload')
require('dotenv').config({
  path: path.resolve(__dirname, "../.migration-env"),
})

async function sourceInit() {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    local: true, // Enables local mode, doesn't spin up a server or frontend
  });
}

function extract() {
  const doodleContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const doodles = yaml.parse(doodleContent)
  return doodles
}

function transfer(rows) {
  return rows.map(({ title, alt, url, date }) => ({
    title,
    alt,
    filename: url,
    publishedDate: (new Date(`${date}, ${Math.round(Math.random()*23)}:${Math.round(Math.random()*59)}:${Math.round(Math.random()*59)}`)).toISOString()
  }))
}

async function load(rows) {
  for(const i in rows) {
    const { filename, title, alt, publishedDate } = rows[i]
    await payload.create({
      collection: "doodles",
      data: {
        title,
        alt,
        publishedDate
      },
      filePath: path.resolve(__dirname, 'jpg-doodles', filename),
    });
    console.log(`Imported "${title}" successfully!`)
  }
}

async function migrate() {
  await sourceInit()
  const sourceRows = extract()
  const destinationRows = transfer(sourceRows)
  await load(destinationRows)
  console.log('Finished!')
  process.exit()
}

migrate()
