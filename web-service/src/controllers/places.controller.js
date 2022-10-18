const model = require('../models')

exports.create = async (req, res) => {
  try {
    const insert = await model.places.insertPlace(req.body)
    const place = insert.rows[0]
    return res.json({
      success: true,
      message: 'Create Place successfully',
      results: place
    })
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: `Error: ${err.message}`
    })
  }
}

exports.readAll = async (req, res) => {
  try {
    const places = await model.places.findAllPlaces()
    return res.json({
      success: true,
      message: 'Read All Places successfully',
      results: places.rows[0]['jsonb_build_object']
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error: ${err.message}`
    })
  }
}
