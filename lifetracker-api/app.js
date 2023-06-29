const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const { NotFoundError } = require("./utils/errors")
const authRoutes = require('./routes/auth')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use('/auth', authRoutes)

app.get('/', (req,res) => {
    res.status(200).json({ping:'pong'})
})

app.get('/user', (req, res) => {
  
})
app.use((req, res, next) => {
    return next(new NotFoundError())
  })

module.exports = app;