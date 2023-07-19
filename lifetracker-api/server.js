const express =require('express')
const cors = require('cors')
// const User = require('./users')
const authRoutes = require("./routes/auth")
const security = require('./middleware/security')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(security.extractUserFromJwt)

app.use("/auth", authRoutes);

app.get('/', (req,res)=> {
    res.send({ping: 'pong'})
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
})
module.exports = app