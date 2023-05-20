"use strict"

const jwt = require("jsonwebtoken")
const tokens = require("../utils/tokens")
const security = require("./security")
const { UnauthorizedError } = require("../utils/errors")

const validJwt = tokens.generateToken({ email: `lebron@james.io`, username: "lebron", isAdmin: false })
const invalidJwt = jwt.sign({ email: `lebron@james.io`, username: "lebron", isAdmin: false }, "invalid_key")

describe("Security", () => {
  describe("jwtFrom", () => {
    test("Correctly parses token from valid authorization header", () => {
      const req = { headers: { authorization: `Bearer ${validJwt}` } }

      const token = security.jwtFrom(req)
      expect(token).toEqual(validJwt)
    })

    test("Returns undefined when no auth header present", () => {
      const req = { headers: {} }

      const token = security.jwtFrom(req)
      expect(typeof token).toEqual("undefined")
    })

    test("Returns undefined when scheme is invalid", () => {
      const req = { headers: { authorization: `Invalid ${validJwt}` } }

      const token = security.jwtFrom(req)
      expect(typeof token).toEqual("undefined")
    })
  })

  describe("extractUserFromJwt", () => {
    test("Extracts user from valid jwt", () => {
      expect.assertions(2)

      const req = { headers: { authorization: `Bearer ${validJwt}` } }
      const res = { locals: {} }
      const next = (err) => expect(err).toBeFalsy()
      security.extractUserFromJwt(req, res, next)
      expect(res.locals).toEqual({
        user: {
          iat: expect.any(Number),
          email: "lebron@james.io",
          username: "lebron",
          isAdmin: false,
        },
      })
    })

    test("Does nothing with an invalid jwt", () => {
      expect.assertions(2)

      const req = { headers: { authorization: `Bearer ${invalidJwt}` } }
      const res = { locals: {} }
      const next = (err) => expect(err).toBeFalsy()
      security.extractUserFromJwt(req, res, next)
      expect(res.locals).toEqual({})
    })

    test("Does nothing with no jwt", () => {
      expect.assertions(2)

      const req = { headers: { authorization: `Bearer` } }
      const res = { locals: {} }
      const next = (err) => expect(err).toBeFalsy()
      security.extractUserFromJwt(req, res, next)
      expect(res.locals).toEqual({})
    })

    test("Does nothing with no auth header", () => {
      expect.assertions(2)

      const req = { headers: {} }
      const res = { locals: {} }
      const next = (err) => expect(err).toBeFalsy()
      security.extractUserFromJwt(req, res, next)
      expect(res.locals).toEqual({})
    })
  })

  describe("requireAuthenticatedUser", () => {
    test("Doesn't throw errors when user is present", () => {
      expect.assertions(1)
      const req = {}
      const res = { locals: { user: { email: `lebron@james.io`, username: "lebron", isAdmin: false } } }
      const next = (err) => expect(err).toBeFalsy()
      security.requireAuthenticatedUser(req, res, next)
    })

    test("Throws errors when no user is present", () => {
      expect.assertions(1)
      const req = {}
      const res = { locals: {} }
      const next = (err) => expect(err instanceof UnauthorizedError).toBeTruthy()
      security.requireAuthenticatedUser(req, res, next)
    })
  })

  describe("requireAdminUser", () => {
    test("Doesn't throw errors when user is a valid admin", () => {
      expect.assertions(1)
      const req = {}
      const res = { locals: { user: { email: `admin@admin.io`, username: "admin", isAdmin: true } } }
      const next = (err) => expect(err).toBeFalsy()
      security.requireAdminUser(req, res, next)
    })

    test("Throws errors when user is not admin", () => {
      expect.assertions(1)
      const req = {}
      const res = { locals: { user: { email: `lebron@james.io`, username: "lebron", isAdmin: false } } }
      const next = (err) => expect(err instanceof UnauthorizedError).toBeTruthy()
      security.requireAdminUser(req, res, next)
    })

    test("Throws errors when no user present", () => {
      expect.assertions(1)
      const req = {}
      const res = { locals: {} }
      const next = (err) => expect(err instanceof UnauthorizedError).toBeTruthy()
      security.requireAdminUser(req, res, next)
    })
  })

  describe("requireMatchingUsernameOrAdmin", () => {
    test("Doesn't throw errors when user is admin", () => {
      expect.assertions(1)
      const req = { params: { username: "lebron" } }
      const res = { locals: { user: { email: `admin@admin.io`, username: "admin", isAdmin: true } } }
      const next = (err) => expect(err).toBeFalsy()
      security.requireMatchingUsernameOrAdmin(req, res, next)
    })

    test("Doesn't throw errors when user matches route params", () => {
      expect.assertions(1)
      const req = { params: { username: "lebron" } }
      const res = { locals: { user: { email: `lebron@james.io`, username: "lebron", isAdmin: false } } }
      const next = (err) => expect(err).toBeFalsy()
      security.requireMatchingUsernameOrAdmin(req, res, next)
    })

    test("Throw error when other user is authed", () => {
      expect.assertions(1)
      const req = { params: { username: "lebron" } }
      const res = { locals: { user: { email: `serena@williams.io`, username: "serena", isAdmin: false } } }
      const next = (err) => expect(err instanceof UnauthorizedError).toBeTruthy()
      security.requireMatchingUsernameOrAdmin(req, res, next)
    })

    test("Throw error when no user is authed", () => {
      expect.assertions(1)
      const req = { params: { username: "lebron" } }
      const res = { locals: {} }
      const next = (err) => expect(err instanceof UnauthorizedError).toBeTruthy()
      security.requireMatchingUsernameOrAdmin(req, res, next)
    })
  })
})
