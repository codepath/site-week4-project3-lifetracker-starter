const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const { NotFoundError } = require("./utils/errors")
const authRoutes = require('./routes/auth')
const security = require('./middleware/security')
const nutritionRoutes = require('./routes/nutrition')
const activityRoutes = require('./routes/activity')
const sleepRoutes = require('./routes/sleep')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(security.extractUserFromJWT)
app.use('/auth', authRoutes)
app.use('/nutrition', nutritionRoutes)
app.use('/activity', activityRoutes)
app.use('/sleep', sleepRoutes)


app.get('/', (req,res) => {
  res.status(200).json({ping:'pong'})
})


app.use((req, res, next) => {
  return next(new NotFoundError())
})

//Not Found Error
app.use('/', (req, res, next)=> {
  return next(new NotFoundError)
})

//Generic Error Handling
app.use( (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})

module.exports = app;