const { body, validationResult } = require('express-validator')

const placesValidators = [
  body('nama_tempat').isLength({min: 4}),
  body('kategori').isNumeric(),
  body('longitude').optional(),
  body('latitude').optional(),
  body('lahan').optional(),
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
