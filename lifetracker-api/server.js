const express= require('express')
const User = require('./users')
const cors = require('cors')

const app = express()
const PORT= 3000

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send({ping: 'pong'})
})

app.post('/auth/login', async (req,res)=> {
    const user= await User.login(req.body.email, req.body.password)
    if (user) {
        const token = User.generateAuthToken(user)
        res.json( { user, token } )
      }
      else {
        res.status(401).json( { error: 'Invalid email or password'} )
      }

    // res.send(user)
})

app.post('/auth/register', async (req,res)=> {
    // console.log('registered')
    const {email, username, firstName, lastName, password} = req.body
    // console.log('reg route',req.body)
    const user = await User.register(email, username, firstName, lastName, password)
    if (user) {
        const token = User.generateAuthToken(user)
        res.json( { user, token } )
      }
      else {
        res.status(401).json( { error: 'Invalid email or password'} )
      }
    // console.log('user', user)
    // res.send(user) 
})

app.post('./sleep/create', async (req,res) => {
    const {email, password, startTime, endTime} = req.body
    const sleepSession= await User.addSleep()
})

// app.get('/user/:id', async (req,res) => {
//     const userID= req.params.id
//     const user= await User.getName('bereket')
//     res.send(user.rows[0])
// })

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
})