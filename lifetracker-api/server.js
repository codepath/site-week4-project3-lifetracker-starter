const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(morgan())

const PORT = process.env.PORT || 3000


app.get('/', (req,res) => {
    res.send("<h4>The server is running</h4>")
})
app.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`)
})