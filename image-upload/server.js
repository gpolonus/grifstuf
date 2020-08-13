
const app = require('express')();
const multer = require('multur')();
const bodyParser = require('express')();
const path = require('path');
const fs = require('fs');
const imageData = require('./imageData.json');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './images/'),
  filename: (req, file, cb) => cb(null, file.originalname)
})

const upload = multer({
  storage
}).array('image', 1)

app.use(bodyParser())
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/images', (req, res) => {
  res.send(JSON.stringify(imageData));
})

app.post('/image', upload, (req, res) => {
  const newData = {
    file: req.file,
    date: Date.now()
  }
  imageData.push(newData)
	saveImageFile(imageData)
})

const saveImageFile = (imageData) => {
  const data = new Uint8Array(Buffer.from(JSON.stringify(imageData)));
  fs.writeFile('./imageData.json', data, (err) => {
	  if (err) throw err;
	  console.log('The file has been saved!');
	});
}

const port = process.env.NODE_ENV === 'PROD' ? 80 : 8080;
app.listen(port);
console.log('Listening on port ' + port);

