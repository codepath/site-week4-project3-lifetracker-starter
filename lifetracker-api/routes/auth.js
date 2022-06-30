const express = require("express")
const User = require("../models/user")
const router = express.Router()
const { generateAccessToken } = require("../utils/tokens")
const authenticateToken = require("../middleware/security")


router.post("/login", async (req, res, next) => {
    try {
        const user = await User.login(req.body)
        const accessToken = generateAccessToken(user)
        res.status(200).json({"token": accessToken, "user": user})
    }
    catch(error) {
        next(error)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        res.status(201).json({user});
    }
    catch(error) {
        next(error)
    }
})


router.get("/me", authenticateToken, async (req, res, next) => {
    try {
        res.status(201).json(req.user)
    }
    catch(error) {
        next(error)
    }
})

module.exports = router