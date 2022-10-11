const client = require('../../helpers/db')

module.exports = (req, res) => {
	const { name, category, coord, area } = req.body
	let query = `INSERT INTO (nama_tempat, kategori, koordinat, area) VALUES ($name, $category, $coord, $area)`
	client.query(query)
		.then(res => {})
		.catch(err, s => {})
}