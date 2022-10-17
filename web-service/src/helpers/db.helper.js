const { Client } = require('pg')

const config = {
  user: 'sig-user',
  host: 'localhost',
  database: 'sig2',
  password: 'password',
  port: '5432'
}

module.exports = new Client(config)