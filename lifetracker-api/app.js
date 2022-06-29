//All import statements
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

//instantiate the app 
const app = express()

//put in the middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))


//health check route 
app.get('/', (req, res) => {
    res.status(200).json({ping:"pong"})
})
module.exports = app