import express from 'express'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, '/views')))

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.get('/profile', (req, res) => {
  res.render('pages/profile')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
