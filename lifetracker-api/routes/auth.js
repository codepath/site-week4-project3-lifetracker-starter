const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.post("/register", async function (req, res, next) {
    try {
        console.log("here")
      const user = await User.register(req.body)
      return res.status(201).json({ user })
    } catch (err) {
      next(err)
    }
  })

  module.exports = router
