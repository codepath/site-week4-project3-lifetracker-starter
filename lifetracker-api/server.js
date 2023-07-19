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
        res.status(200).json( { user, token } )
      }
      else {
        res.status(401).json( { error: 'Invalid email or password'} )
      }

})

app.post('/auth/register', async (req,res)=> {
    const {email, username, firstname, lastname, password} = req.body
    const user = await User.register(email, username, firstname, lastname, password)

    if (user) {
        const token = User.generateAuthToken(user)
        res.status(201).json( { user, token } )
      }
      else {
        
        res.status(401).json( { error: 'Invalid email or password'} )
      }
    
})

app.post('/sleep/create', async (req,res) => {
    const {email, startTime, stopTime} = req.body
    const sleepSession= await User.addSleep(email, startTime, stopTime)
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

app.post('/exercise', async (req,res) => {
    const {email}= req.body
    const user= await User.getExerciseByEmail(email)
    res.status(200).json(user)
})

app.post('/nutrition', async (req,res) => {
    const {email}= req.body
    const user= await User.getNutritionByEmail(email)
    res.status(200).json(user)
})

app.post('/sleep', async (req,res) => {
    const {email}= req.body
    const userDB= await User.getSleepByEmail(email)
    res.status(200).json(userDB)
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
})