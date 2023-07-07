const User = require('../users')
const express =require('express')
const router = express.Router();
// const {createUserJwt} = require('../middleware/security')

router.post("/register", async (req,res) => {
    const input=req.body
    const user = await User.register(input)
    res.send(user)
})

router.post("/login", async (req,res) => {
    const input = req.body
    const {userInfo, sleep} = await User.login(input)
    // const token = createUserJwt(user)
    return res.status(200).json({userInfo, sleep})
})

router.post("/sleep", async (req,res) => {
    const input = req.body
    const sleep = await User.sleep(input)
    res.send({sleep})
})

router.post("/sleepstats", async (req,res) => {
    const input = req.body
    const sleepstats = await User.sleepstats(input)
    res.send({sleepstats})
})

// router.post("/nutriton", async (req,res) => {
//     const input = req.body
//     const user = await User.nutrition(input)
//     res.send({user})
// })

// router.post("/activity", async (req,res) => {
//     const input = req.body
//     const user = await User.activity(input)
//     res.send({user})
// })

// router.post("/exercise", async (req,res) => {
//     const input = req.body
//     const user = await User.exercise(input)
//     res.send({user})
// })




module.exports = router