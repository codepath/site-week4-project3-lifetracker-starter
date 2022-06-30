const express = require("express")
const User = require("../models/user")
const { createUserJwt } = require("../utils/tokens")
const security = require("../middleware/security")
const router = express.Router()

router.post("/login", async (req, res, next) => {
    try {
        // Take the users email and password, attempting to authenticate them
        const user = await User.login(req.body)
        const token = createUserJwt(user)
        return res.status(200).json({ user, token })
    } catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        // Take the user's email, pw
        // and create a new user in the DB
        const user = await User.register(req.body)
        const token = createUserJwt(user)
        return res.status(201).json({ user, token })
    } catch(err) {
        next(err)
    }
})

//below working, but result brought back is empty object
router.get("/me", security.requireAuthenticatedUser, async (req,res,next) => {
    try {
        const { email } = res.locals.user
        const user = await User.fetchUserByEmail(email)
        const publicUser = User.makePublicUser(user)
        return res.status(200).json({ user: publicUser })
    } catch(err) {
        next(err)
    }
})

module.exports = router