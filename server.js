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
const url = 'mongodb://localhost:27017/'


app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, '/views')));

app.get('/', (req, res) => {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("recordbookdb");

    dbo.collection("students").find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render('pages/index', { students: result });
      db.close();
    });
  });
})

app.get('/profile', (req, res) => {

  mongoClient.connect(function (err, client) {

    if (err) {
      return console.log(err);
    } else {
      console.log('connection established');
    }
    // database interaction 
    client.close();
  });

  res.render('pages/profile');
})

app.get('/book', (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("recordbookdb");
    var query = { first_name: 'max', last_name: 'pokrovskiy'}

    dbo.collection("students").find(query, { 
      '_id': false,
      'first_name': false,
      'last_name': false,
      'records': true, 
    }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result[0]['records']['math']);
      res.render('pages/book', { records: result[0]['records']['math'] });
      db.close();
    });
  });
  // res.render('pages/book');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
