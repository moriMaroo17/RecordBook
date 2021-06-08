import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pkg from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// TODO: Connect MongoDB

const { MongoClient } = pkg;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

mongoClient.connect(function (err, client) {

  if (err) {
    return console.log(err);
  } else {
    console.log('connection established');
  }
  // database interaction 
  client.close();
});

app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, '/views')));

app.get('/', (req, res) => {
  res.render('pages/index');
})

app.get('/profile', (req, res) => {
  res.render('pages/profile');
})

app.get('/book', (req, res) => {
  res.render('pages/book');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
