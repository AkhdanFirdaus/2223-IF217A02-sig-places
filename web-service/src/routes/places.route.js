const places = require('express').Router()

const controller = require('../controllers')

const { placesValidators, validate } = require('../middlewares/places_input_validation')

places.get('/', controller.place.readAll)
places.post('/', placesValidators, validate, controller.place.create)

module.exports = places
