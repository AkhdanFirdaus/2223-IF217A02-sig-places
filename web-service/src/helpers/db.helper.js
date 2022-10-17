const { Pool } = require('pg')

const config = {
  user: 'sig-user',
  host: 'localhost',
  database: 'sig2',
  password: 'password',
  port: '5432'
}

const db = new Pool({
  connectionString: `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`
})

module.exports = db
