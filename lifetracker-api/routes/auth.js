
/** Routes for authentication. */

const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)
    return res.status(200).json({ user })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async function (req, res, next) {
  console.log("hit register route")
  console.log("regsiter body", req.body)
  try {
    const user = await User.register(req.body) //controller 
    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
})


module.exports = router