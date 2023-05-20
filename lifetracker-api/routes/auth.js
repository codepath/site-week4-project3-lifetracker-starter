"use strict"

/** Routes for authentication. */

const express = require("express")
const User = require("../models/user")
const { createUserJwt } = require("../utils/tokens")
const { validateFields } = require("../utils/validate")
const { UnprocessableEntityError } = require("../utils/errors")
const router = new express.Router()

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token/", async function (req, res, next) {
  const { email, password } = req.body
  const requiredFields = ["email", "password"]
  validateFields({ required: requiredFields, obj: req.body, location: "login route" })

  const user = await User.authenticate({ email, password })
  const token = createUserJwt(user)
  return res.status(200).json({ user, token })
})

/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register/", async function (req, res, next) {
  const requiredFields = ["email", "password", "firstName", "lastName", "username"]
  validateFields({ required: requiredFields, obj: req.body, location: "registration route" })

  if (req.body.email.indexOf("@") === -1) {
    throw new UnprocessableEntityError("Invalid email")
  }

  try {
    const user = await User.register({ ...req.body, isAdmin: false })
    const token = createUserJwt(user)
    return res.status(201).json({ user, token })
  } catch (err) {
    throw err
  }
})

module.exports = router
