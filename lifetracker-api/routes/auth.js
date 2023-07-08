const User = require('../users')
const express =require('express')
const router = express.Router();
const{createUserJwt}=require('../utils/token')
const security = require("../middleware/security");
// const {createUserJwt} = require('../middleware/security')

router.post("/register", async (req,res) => {
    console.log("going here")
    const input=req.body
    const user = await User.register(input)
    const token = createUserJwt(user)
    return res.status(200).json({user, token})
})

router.post("/login", async (req,res) => {
    const input = req.body
    const {userInfo, sleep} = await User.login(input)
    const token = createUserJwt(userInfo)
    return res.status(200).json({userInfo, token, sleep})
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

router.get("/me", security.requireAuthUser,
 async (req,res) => {
    console.log(res.locals.user)
    const {email} = res.locals.user;
    const userInfo = await User.fetchUserByEmail(email)
    const sleep = await User.allsleep(userInfo.id)
    return res.status(200).json({userInfo, sleep})
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