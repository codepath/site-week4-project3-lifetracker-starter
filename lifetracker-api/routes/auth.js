const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.post("/login", async(req, res, next) => {
    try {

        const user = await User.login(req.body)
        return res.status(200).json({ user })

    } catch (error) {
        next(error)
    }
})

router.post("/register", async(req, res, next) => {
try {

    const user = await User.register(req.body)
    return res.status(201).json({ user })
    
} catch (error) {
    next(error)
}
})

module.exports = router