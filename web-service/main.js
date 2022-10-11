const express = require('express')
const app = express()
const port = 3000
const client = require('./helpers/db')

const getPlaces = require('./features/places/get')
const postPlace = require('./features/places/post')

const cors = require('cors')

app.use(cors({origin: '*'}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Helloworld')
})

app.get('/places', getPlaces)
app.post('/places', postPlace)

app.listen(port, () => {
	client.connect(err => {
    if (err) throw err
    console.log('Connected!')
  })
  console.log('helloworld')
})