

"use strict"

/** Routes for authentication. */

const express = require("express")
const User = require("../models/user")
const Exercise = require("../models/exercise")
const router = express.Router()
const {createUserJwt} = require ("../utils/token")
const security = require ("../middleware/security")

// router.post("/login", async function (req, res, next) {
//   try {
//     const user = await User.authenticate(req.body)
//     return res.status(200).json({ user })
//   } catch (err) {
//     next(err)
//   }
// })


//login endpoint
router.post("/login", async function (req, res, next) {
  try {
    const user = await User.login(req.body)
    if (user.error) {
      res.send(user.error);
      return res.status(400).send(user)
    }
    //Generate the user token once they login
    const token = User.generateAuthToken(user) // const token = createUserJwt(user)
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

// router.post("/login", async function (req, res, next) {
//   try {
//     const user = await User.login(req.body)
//     const token = createUserJwt(user)
//     return res.status(200).json({user, token})
//   }catch(err){
//     next(err)
//   }
// })


router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    const token = User.generateAuthToken(user)
    return res.status(201).json({ user, token })
  } catch (err) {
    next(err)
  }
})

  
  
   
  router.get("/me", security.requiredAunthenticatedUser,async (req, res, next) => {
        try{
            const {email} = res.locals.user
            const user = await User.fetchUserByEmail(email)
            const publicUser = User.makePublicUser(user)
            return res.status(200).json ({user: publicUser})
        } catch(err){
            next(err)
        }
      })


module.exports = router
