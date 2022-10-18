const db = require('../helpers/db.helper')

const table = 'jabar.pariwisata'

exports.insertPlace = (data) => {
  const sql = `INSERT INTO ${table} (nama_tempat, kategori, koordinat) VALUES($1, $2, ST_GeomFromText('POINT($3 $4)', 4326)) RETURNING *;`
  const params = [data.nama_tempat, data.kategori, data.longitude, data.latitude]
  return db.query(sql, params)
}

exports.findAllPlaces = () => {
  const sql = `SELECT JSONB_BUILD_OBJECT(
		'type', 'FeatureCollection',
		'features', JSON_AGG(features.feature)
	) 
	FROM (
		SELECT row_to_json(inputs) As feature 
			FROM (SELECT 'Feature' As type 
			, ST_AsGeoJSON(l.lahan)::json As geometry 
			, row_to_json((SELECT l FROM (SELECT id_tempat, nama_tempat, kategori) As l)) As properties 
			FROM ${table} As l WHERE l.lahan is not NULL) As inputs
	) features`

  return db.query(sql)
}
