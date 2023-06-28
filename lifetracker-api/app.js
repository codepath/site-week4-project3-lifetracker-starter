const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

const config = require("./config")

const app = express()


app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))

app.get("/", (req,res) => {
    console.log("it's all connected")
    res.status(200).json("Success")
})
module.exports = app