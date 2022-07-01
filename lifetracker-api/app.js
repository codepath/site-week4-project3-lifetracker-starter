const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const authRoutes = require("./routes/auth")
const nutritionRoutes = require("./routes/nutrition")
const security = require("./middleware/security")

const {BadRequestError, NotFoundError} = require("./utils/errors")

const app = express()

// enable cross-origin resource sharing for all origins
app.use(cors())
//parse incoming request bodies with JSON payloads
app.use(express.json())
//log request info
app.use(morgan("tiny"))
//for every request, check if token exists in the authorization header
//if does, attach decoded user to res.locals
app.use(security.extractUserFromJwt)

app.use("/auth", authRoutes)
app.use("/nutrition", nutritionRoutes)

app.get("/", (req, res, next) => {
    return res.status(200).json({ping: "pong"})
})

app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: {message, status}
    })
})

module.exports = app