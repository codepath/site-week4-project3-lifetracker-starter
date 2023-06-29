const express = require('express')
const router = express.Router();
const User = require('../models/user')

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split('')[1]

    if (!token)
    {
        return res.status(401).json({ error: "Missing auth token"})
    }
    // try {
    //     const decoded = user.
    // }
}
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.login(req.body)
        return res.status(200).json({ user })
    } catch(err) {
        next(err)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const user = await User.register(req.body)
        return res.status(201).json({ user })
    } catch(err) {
        next(err)
    }
})

module.exports = router