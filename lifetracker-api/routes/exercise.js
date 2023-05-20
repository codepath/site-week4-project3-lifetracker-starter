"use strict"

/** Routes for exercise. */

const express = require("express")
const Exercise = require("../models/exercise")
// const { validateFields } = require("../utils/validate")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions/exercise")
const router = new express.Router()

router.post("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const exercise = await Exercise.create({ exercise: req.body.exercise, user: res.locals.user })
    return res.status(201).json({ exercise })
  } catch (err) {
    return next(err)
  }
})

router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const exercises = await Exercise.list({ user: res.locals.user })
    res.status(200).json({ exercises })
  } catch (err) {
    return next(err)
  }
})

router.get(
  "/:exerciseId",
  security.requireAuthenticatedUser,
  permissions.userIsExerciseOwner,
  async function (req, res, next) {
    try {
      const exercise = res.locals.exercise
      return res.status(200).json({ exercise })
    } catch (err) {
      return next(err)
    }
  }
)

module.exports = router
