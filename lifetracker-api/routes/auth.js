const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.post("/login", async (req, res, next) => {
    try {
        // Take the users email and password, attempting to authenticate them
        const user = await User.login(req.body)
        return res.status(200).json({ user })
    } catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        // Take the user's email, pw
        // and create a new user in the DB
        const user = await User.register(req.body)
        return res.status(201).json({ user })
    } catch(err) {
        next(err)
    }
})

module.exports = router