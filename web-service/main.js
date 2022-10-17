const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 3000

app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))

app.use('/', require('./src/routes'))

app.listen(port, () => {
  console.log('helloworld')
})
