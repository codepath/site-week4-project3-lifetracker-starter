const express = require('express')
const User = require('../models/user')
const router = express.Router()


router.get('/me', async (req, res, next) => {
    res.status(200).json({"message" : "from the auth file @ the me route"})
})

router.post('/login', async (req, res, next) => {
    const user = await User.login(req.body)
    res.status(200).json({user})
})

router.post('/register', async (req, res, next) => {
    try {
        const user = await User.register(req.body)
        return res.status(201).json({user})
    }catch(err){
        next(err)
    }
    
})

module.exports = router