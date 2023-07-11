"use strict"

/** Express app for Vaccine Hub */

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const { NotFoundError } = require("./utils/erros")
const config = require("./config")
const {PORT} = require("./config")
const security = require ("./middleware/security")
const authRoutes = require("./routes/auth")
const exerciseRoutes = require("./routes/exercise")

const app = express()

// enable cross-origin resource sharing for all origins for all requests
// NOTE: in production, we'll want to restrict this to only the origin
// hosting our frontend.
app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("tiny"))

app.use(security.extractUserFromJwt)
// routes
app.use("/auth", authRoutes)
app.use("/exercise", exerciseRoutes)

// health check
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  })
})

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError())
})

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (!config.IS_TESTING) console.error(err.stack)
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})




app.listen(PORT,() =>{
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})