const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const { NotFoundError } = require("./utils/errors")


const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requeseted-With, Content-Type, Accept");
  next()
})

app.use(morgan("tiny"))
app.use(express.json())
app.use(cors())

const authRoute = require("./routes/auth")

app.use("/auth", authRoute)

app.get("/", async (req, res, next) => {
    res.status(200).json({"ping": "pong"})
  })
/* Handle all 404 errors that weren't matched by a route */
app.use((req, res, next) => {
  return next(new NotFoundError())
})

/* Generic error handler - anything that is unhandled will be handled here */
app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message

  return res.status(status).json({
    error: { message, status },
  })
})

module.exports = app