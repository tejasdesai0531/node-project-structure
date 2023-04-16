const cors = require('cors')
const express = require('express')
const app = express()
const indexRouter = require('./modules/route')

app.use(cors())
app.use(express.json())

app.use('/api/admin', indexRouter)

module.exports = app;