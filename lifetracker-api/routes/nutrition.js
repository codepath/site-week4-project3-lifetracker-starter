const express = require("express")
const Nutrition = require("../models/nutrition")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    console.log("this is the user: ", res.locals.user)
    const nutritions = await Nutrition.listNutritions({ user: res.locals.user })
    return res.status(200).json({ "nutritions" : nutritions })
  } catch (err) {
    next(err)
  }
})

router.post("/create", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
   // const { user } = res.locals
    console.log("RES in /create route: ", res.locals.user)
    const nutrition = await Nutrition.createNutrition({ user: res.locals.user, nutrition: req.body})
    return res.status(201).json({ nutrition })
  } catch (err) {
    next(err)
  }
})

router.get("/:nutritionId", async (req, res, next) => {
  try {
    const { nutritionId } = req.params
    const nutrition = await Nutrition.fetchNutritionById(nutritionId)
    return res.status(200).json({ nutrition })
  } catch (err) {
    next(err)
  }
})

module.exports = router