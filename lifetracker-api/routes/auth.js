"use strict"

/** Routes for authentication. */

const express = require("express")
const User = require("../models/user")
const Exercise = require("../models/exercise")
const Nutrition = require('../models/nutrition')
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
    const exerciseTime = await Exercise.getTimeByUserId(user_id);
    const exerciseAvg = await Exercise.getAvgByUserId(user_id);
    console.log('exercises', exercises);
    return res.status(200).json({ exercises, exerciseTime, exerciseAvg});
  } catch (error) {
    next(error);
  }
});

router.post("/nutrition/create", async function (req, res, next) {
  try {
    const nutrition = await Nutrition.addNutrition(req.body)
    console.log('nutrition', nutrition)
    return res.status(201).json({ nutrition })
  } catch (err) {
    next(err)
  }
})

router.get("/nutrition", async function (req, res, next) {
  try {
    const user_id = req.query.user_id;
    const nutritions = await Nutrition.getNutritionByUserId(user_id);
    const nutritionCalories = await Nutrition.getCaloriesByUserId(user_id);
    const nutritionMax = await Nutrition.getMaxCaloriesByUserId(user_id);
    console.log('nutrition', nutritions);
    return res.status(200).json({ nutritions, nutritionCalories, nutritionMax});
  } catch (error) {
    next(error);
  }
});




module.exports = router