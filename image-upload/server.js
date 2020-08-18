
const express = require('express');
const app = express()
const multer = require('multer');
const bodyParser = require('express');
const path = require('path');
const fs = require('fs');
const mime = require('mime')
const imageData = require('./imageData.json');

const destinationPath = path.join(__dirname, './public/uploads')

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, destinationPath),
  filename: (req, file, cb) => cb(null, `${req.body.name}.${mime.getExtension(file.mimetype)}`)
});

const upload = multer({ storage }).single('image');

app.use(bodyParser())
app.use(express.static(path.join(__dirname, './public')));

app.get('/images', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(imageData));
})

app.post('/upload', upload, (req, res) => {
  console.log(req.file)
  const newData = {
    name: req.body.name,
    filename: req.file.filename,
    date: Date.now()
  }
  imageData.push(newData)
  saveImageFile(imageData).then(() => {
    res.sendStatus(200)
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

const saveImageFile = (imageData) => {
  return new Promise((resolve, reject) => {
    const data = new Uint8Array(Buffer.from(JSON.stringify(imageData)));
    fs.writeFile(path.join(__dirname, './imageData.json'), data, (err) => {
      if (err) reject(err);
      console.log('The file has been saved!');
      resolve();
    });
  })
}

const port = process.env.NODE_ENV === 'PROD' ? 80 : 8080;
app.listen(port);
console.log('Listening on port ' + port);

