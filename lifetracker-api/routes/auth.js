"use strict"

/** Routes for authentication. */

const express = require("express")
const User = require("../models/user")
const Exercise = require("../models/exercise")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
// const security = require("../middleware/security")

// router.get("/me", security.requireAuthenticatedUser, async function (req, res, next) {
//   try {
//     const { email } = res.locals.user
//     const user = await User.fetchUserByEmail(email)
//     return res.status(200).json({ user })
//   } catch (err) {
//     next(err)
//   }
// })

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)

    // GENERATE & SIGN JWT TOKEN, STORE SECRET KEY IN .ENV
    const token = jwt.sign({user_id: user.id, firstName: user.firstName}, "SECRET_KEY",{expiresIn: "1h"})
    return res.status(200).json({ token: token, user })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    console.log('postregister', user)

    // GENERATE & SIGN JWT TOKEN, STORE SECRET KEY IN .ENV
    const token = jwt.sign({user_id: user.id, firstName: user.firstName}, "SECRET_KEY",{expiresIn: "1h"})

    return res.status(201).json({ token: token, user })
  } catch (err) {
    next(err)
  }
})

router.post("/exercise/create", async function (req, res, next) {
  try {
    const exercise = await Exercise.addExercise(req.body)
    console.log('postregister', exercise)
    return res.status(201).json({ exercise })
  } catch (err) {
    next(err)
  }
})

router.get("/exercise", async function (req, res, next) {
  try {
    const user_id = req.query.user_id;
    const exercises = await Exercise.getExercisesByUserId(user_id);
    console.log('exercises', exercises);
    return res.status(200).json({ exercises });
  } catch (error) {
    next(error);
  }
});

module.exports = router