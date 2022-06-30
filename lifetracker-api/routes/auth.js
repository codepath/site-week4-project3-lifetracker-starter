const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.get("/me", async(req, res, next) => {
    try {
        const transactions = await Bank.listTransactions()
        res.status(200).json({ transactions })
    } catch (err) {
        next(err)
    }
})
router.post("/login", async (req, res, next) => {
    try{ 
        const user = await User.login(req.body)
        return res.status(200).json({ user })
    }catch(err){
        next(err)
    }
})

router.post("/register", async(req, res, next) => {
    try{ 
        const user = await User.register(req.body)
        return res. status(201).json({ user })
    }catch(err){
        next(err)
    }
})

module.exports = router