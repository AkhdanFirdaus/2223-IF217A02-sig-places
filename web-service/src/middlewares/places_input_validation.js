const { body, validationResult } = require('express-validator')

const placesValidators = [
  body('nama_tempat').isLength({min: 4}),
  body('kategori').isNumeric(),
  body('koordinat').optional().withMessage('Koordinat harus format longitude, latitude'),
  body('lahan').optional().withMessage('Format harus poligon area'),
]

const validate = (req, res, next) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      })
    }

    return next()
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: err
    })
  }
}

module.exports = {
  placesValidators,
  validate
}
