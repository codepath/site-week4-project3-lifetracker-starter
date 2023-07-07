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
    console.log(req.body)
    const user= await User.login(req.body.email, req.body.password)
    // res.json(user)
    if (user) {
        const token = User.generateAuthToken(user)
        res.status(200).json( { user, token } )
      }
      else {
        res.status(401).json( { error: 'Invalid email or password'} )
      }

    // res.send(user)
})

app.post('/auth/register', async (req,res)=> {
    // console.log('registered')
    const {email, username, firstname, lastname, password} = req.body
    // console.log('reg route',req.body)
    const user = await User.register(email, username, firstname, lastname, password)
    console.log(user)
    if (user) {
        const token = User.generateAuthToken(user)
        console.log(token)
        res.status(201).json( { user, token } )
      }
      else {
        
        res.status(401).json( { error: 'Invalid email or password'} )
      }
    // console.log('user', user)
    // res.send(user) 
})

app.post('/sleep/create', async (req,res) => {
    const {email, startTime, stopTime} = req.body
    console.log('newsleep', req.body)
    const sleepSession= await User.addSleep(email, startTime, stopTime)
    console.log(sleepSession)
    res.status(201).json(sleepSession)
})

app.post('/exercise/create', async (req,res) => {
    const {email, name, category, duration, intensity} = req.body
    const newExercise= await User.addExercise(email, name, category, duration, intensity)
    res.status(201).json(newExercise)
})

app.post('/nutrition/create', async (req,res) => {
    const {email, name, category, quantity, calories, url } = req.body
    const newMeal= await User.addNutrition(email, name, category, quantity, calories, url)
    res.status(201).json(newMeal)
})

app.get('/exercise', async (req,res) => {
    const {email}= req.body
    const user= await User.getExerciseByEmail(email)
    res.status(200).json(user)
})

app.get('/nutrition', async (req,res) => {
    const {email}= req.body
    const user= await User.getNutritionByEmail(email)
    res.status(200).json(user)
})

app.post('/sleep', async (req,res) => {
    console.log('server sleep',req.body)
    const {email}= req.body
    const userDB= await User.getSleepByEmail(email)
    res.status(200).json(userDB)
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
})