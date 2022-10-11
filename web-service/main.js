const express = require('express')
const app = express()
const port = 3000

const { Client } = require('pg')
const cors = require('cors')

const client = new Client({
  user: 'sig-user',
  host: 'localhost',
  database: 'sig',
  password: 'password',
  port: '5432'
})

app.use(cors({origin: '*'}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Helloworld')
})

app.get('/places', (req, res) => {
  client.query(`
		SELECT JSONB_BUILD_OBJECT(
			'type', 'FeatureCollection',
			'features', JSON_AGG(features.feature)
		) 
		FROM (
			SELECT row_to_json(inputs) As feature 
				FROM (SELECT 'Feature' As type, 
				ST_AsGeoJSON(l.lahan)::json As geometry, 
				row_to_json((SELECT l FROM (SELECT id_tempat, nama_tempat, kategori) As l)) As properties 
				FROM jabar.pariwisata As l WHERE l.lahan is not NULL) As inputs
		) features
  `, (e, r) => {
    res.json({
      data: r.rows[0]
    })
  })
})

app.post('/places', (req, res) => {
	const { name, category, coord, area } = req.body

	let query = `INSERT INTO (nama_tempat, kategori, koordinat, area) VALUES ($name, $category, $coord, $area)`

})

app.listen(port, () => {
	client.connect(err => {
    if (err) throw err
    console.log('Connected!')
  })
  console.log('helloworld')
})