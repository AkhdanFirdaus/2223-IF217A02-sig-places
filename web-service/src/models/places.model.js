const db = require('../helpers/db.helper')

const table = 'jabar.pariwisata'

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