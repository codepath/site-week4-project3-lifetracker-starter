const express =require('express')
const cors = require('cors')
const User = require('./users')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req,res)=> {
    res.send({ping: 'pong'})
})

app.post("/auth/register", async (req,res) => {
    const input=req.body
    const user = await User.register(input)
    res.send(user)
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
})