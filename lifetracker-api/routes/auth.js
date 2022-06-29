const express = require('express')
const router = express.Router()


router.get('/me', async (req, res, next) => {
    res.status(200).json({"message" : "from the auth file @ the me route"})
})

router.post('/login', async (req, res, next) => {
    res.status(200).json({"message" : "from the auth file @ the login"})
})

router.post('/register', async (req, res, next) => {
    res.status(200).json({"message" : "from the auth file @ the register"})
})

module.exports = router