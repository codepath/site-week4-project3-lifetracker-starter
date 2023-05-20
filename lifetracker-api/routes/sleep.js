"use strict"

/** Routes for exercise. */

const express = require("express")
const Sleep = require("../models/sleep")
// const { validateFields } = require("../utils/validate")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions/sleep")
const router = new express.Router()

router.post("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const sleep = await Sleep.create({ sleep: req.body.sleep, user: res.locals.user })
    return res.status(201).json({ sleep })
  } catch (err) {
    return next(err)
  }
})

router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const exercises = await Exercise.list({ user: res.locals.user })
    return res.status(200).json({ exercises })
  } catch (err) {
    return next(err)
  }
})

router.get(
  "/:sleepId",
  security.requireAuthenticatedUser,
  permissions.userIsSleepOwner,
  async function (req, res, next) {
    try {
      const sleep = res.locals.sleep
      return res.status(200).json({ sleep })
    } catch (err) {
      return next(err)
    }
  }
)

module.exports = router
