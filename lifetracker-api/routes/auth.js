const express = require('express')
const router = express.Router()
const User = require('../models/user')

// router.get("/me", async (req,res,next) => {
//     res.status(200).json({user})
// })



router.post("/login", async (req,res,next) => {
    try
    {
        const user = await User.login(req.body)
        return res.status(200).json({user})
    }
    catch(error)
    {
        next(error)
    }
})

router.post("/register", async (req,res,next) => {
    try
    {
        //Taking user, password, and number of guests and create new user in DB
        const user = await User.register(req.body)
        return res.status(201).json({ user })
    }
    catch(error)
    {
        next(error)
    }
})


module.exports = router