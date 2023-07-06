//Routes for authentication
const express = require("express")
const User = require("../models/user")
const router = express.Router()
const { BadRequestError,NotFoundError } = require("./utils/erros")
const {createUserJwt} = require ("../utils/token")
const security = require("../middleware/security")



//POST endpoint for login
router.post("/login", async function (req, res, next) {
    try {
      //take users email and passwords and attemp to authenticate them
      const user = await User.login(req.body)
      const token = createUserJwt(user)
      return res.status(200).json({ user, token }) //returns user object 
    } catch (err) {
      next(err)
    }
  })

////POST endpoint for register
  router.post("/register", async function (req, res, next) {
    try {
      //take users email and password to create new user in database
      const user = await User.register(req.body)
      const token = createUserJwt(user)
      return res.status(201).json({ user, token }) //201 means user created
    } catch (err) {
      next(err)
    }
  })

  router.get("/me", security.requiredAuthenticatedUser,async (req, res, next) => {
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