const routes = require('express').Router()

routes.use('/places', require('./places.route'))

module.exports = routes
