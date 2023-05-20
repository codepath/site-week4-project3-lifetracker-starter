"use strict"

/** Routes for users. */

const express = require("express")
const User = require("../models/user")
const Exercise = require("../models/exercise")
const Nutrition = require("../models/nutrition")
const Sleep = require("../models/sleep")
const Activity = require("../models/activity")
const security = require("../middleware/security")
const { UnauthorizedError } = require("../utils/errors")
const router = new express.Router()

/**
 * GET /me => { user }
 *
 * @returns User
 */
router.get("/me", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    if (!res.locals.user?.id) throw new UnauthorizedError()

    const user = await User.fetchById(res.locals.user.id)
    if (!user) {
      throw new UnauthorizedError()
    }

    const [exercises, nutrition, sleep] = await Promise.all([
      await Exercise.list({ user }),
      await Nutrition.list({ user }),
      await Sleep.list({ user }),
    ])
    const [
      totalExerciseMinutes,
      averageHoursSleep,
      caloriesSummaryStats,
      averageExerciseIntensity,
      totalHoursSlept,
    ] = await Promise.all([
      await Activity.getTotalExerciseMinutes({ user }),
      await Activity.averageHoursOfSleep({ user }),
      await Activity.getCaloriesSummaryStats({ user }),
      await Activity.averageExerciseIntensity({ user }),
      await Activity.getTotalHoursSlept({ user }),
    ])

    return res.status(200).json({
      user,
      exercises,
      nutrition,
      sleep,
      totalExerciseMinutes,
      averageHoursSleep,
      caloriesSummaryStats,
      averageExerciseIntensity,
      totalHoursSlept,
    })
  } catch (err) {
    return next(err)
  }
})

router.get("/:username", security.requireMatchingUsernameOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username)
    return res.status(200).json({ user })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
