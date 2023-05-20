"use strict"

/** Routes for nutrition. */

const express = require("express")
const Nutrition = require("../models/nutrition")
// const { validateFields } = require("../utils/validate")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions/nutrition")
const router = new express.Router()

router.post("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const nutrition = await Nutrition.create({ nutrition: req.body.nutrition, user: res.locals.user })
    return res.status(201).json({ nutrition })
  } catch (err) {
    return next(err)
  }
})

router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const nutritions = await Nutrition.list({ user: res.locals.user })
    return res.status(200).json({ nutritions })
  } catch (err) {
    return next(err)
  }
})

router.get(
  "/:sleepId",
  security.requireAuthenticatedUser,
  permissions.userIsNutritionOwner,
  async function (req, res, next) {
    try {
      const nutrition = res.locals.nutrition
      return res.status(200).json({ nutrition })
    } catch (err) {
      return next(err)
    }
  }
)

module.exports = router
