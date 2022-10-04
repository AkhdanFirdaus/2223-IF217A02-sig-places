const express = require('express');
const app = express();

const Pool = require('pg').Pool;

const client = new Pool({
  user: 'sig-user',
  host: 'localhost',
  database: 'sig',
  password: 'password',
  port: '5432'
});

app.get('/', (req, res) => {
  req.send('Helloworld')
});

app.get('/places', (req, res) => {
  client.connect(err => {
    if (err) throw err;
    console.log('Connected!')
  })

  client.query('SELECT * FROM jabar.pariwisata', (e, r) => {
    res.json({
      data: r.data
    });
  });
});

app.listen(3000, () => {
  console.log('helloworld');
});