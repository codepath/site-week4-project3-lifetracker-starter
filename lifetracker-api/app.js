const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { PORT } = require("./config")
const authRouter = require("./routes/auth")

const { NotFoundError } = require("./utils/errors")

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan("tiny"))

app.use("/auth", authRouter)

app.use((req, res, next) =>{
    return next(new NotFoundError())
})

app.use((error, req, res, next) =>{
    const status = error.status || 500
    const message = error.message
    return res.status(status).json({
        error: {message, status}
    })
})

module.exports= app