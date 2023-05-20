"use strict"

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")
const { UnauthorizedError } = require("../utils/errors")

const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ")
    if (scheme.trim() === "Bearer") {
      return token
    }
  }

  return undefined
}

/**
 * If the request contains a JWT token in the Authorization header,
 * extract that token, convert the credentials into a user, and attach
 *  it to the response's locals property.
 *
 * https://expressjs.com/en/5x/api.html#res.locals
 *
 */
const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req)
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY)
    }

    return next()
  } catch (err) {
    return next()
  }
}

/**
 * Ensure that a verified user is logged in.
 *
 * If not throw an UnauthorizedError
 *
 *
 */
const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals
    if (!user?.email) throw new UnauthorizedError()
    return next()
  } catch (error) {
    return next(error)
  }
}

/**
 * Ensure that the authenticated user is an admin.
 *
 *
 */
const requireAdminUser = (req, res, next) => {
  try {
    const { user } = res.locals
    if (!user?.isAdmin) throw new UnauthorizedError()
    return next()
  } catch (error) {
    return next(error)
  }
}

/**
 * Ensure that the authenticated user is an admin,
 * or is the user that matches the username seen in the route.
 *
 * ex. username: "lebron" and route `/users/lebron/`
 *
 */
const requireMatchingUsernameOrAdmin = (req, res, next) => {
  try {
    const { user } = res.locals
    if (user?.username === req.params.username || user?.isAdmin) return next()

    throw new UnauthorizedError()
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  jwtFrom,
  extractUserFromJwt,
  requireAuthenticatedUser,
  requireAdminUser,
  requireMatchingUsernameOrAdmin,
}
