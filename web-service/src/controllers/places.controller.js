const model = require('../models')

exports.create = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Begini'
  })
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
