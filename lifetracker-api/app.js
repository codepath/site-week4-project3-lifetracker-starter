const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const { NotFoundError } = require("./utils/errors")

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

const PORT = process.env.PORT || 3000


app.get('/', (req,res) => {
    res.status(200).json({ping:'pong'})
})

app.use(function (req, res, next) {
    return next(new NotFoundError())
  })


module.exports = app;