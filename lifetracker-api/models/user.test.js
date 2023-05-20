"use strict"

const { NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors")
const User = require("./user")
const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll } = require("../tests/models/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

/************************************** authenticate */

describe("authenticate", function () {
  test("user can authenticate successfully", async function () {
    const user = await User.authenticate({ email: "lebron@james.io", password: "password" })

    expect(user).toEqual({
      username: "lebron",
      firstName: "Lebron",
      lastName: "James",
      email: "lebron@james.io",
      isAdmin: false,
    })
  })
  test("unauth if no such user", async function () {
    expect.assertions(1)

    try {
      await User.authenticate({ email: "somebody@else.io", password: "password" })
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy()
    }
  })
  test("unauth if wrong password", async function () {
    expect.assertions(1)

    try {
      await User.authenticate({ email: "lebron@james.io", password: "wrong" })
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy()
    }
  })
})

/************************************** register */

describe("register", function () {
  const newUser = {
    username: "new",
    firstName: "Test",
    lastName: "Tester",
    email: "test@test.io",
    isAdmin: false,
  }
  test("can successfully register user", async function () {
    const user = await User.register({ ...newUser, password: "password" })
    expect(newUser.firstName).toEqual(user.firstName)
    expect(newUser.lastName).toEqual(user.lastName)
    expect(newUser.email).toEqual(user.email)
  })

  test("bad request with dup data", async function () {
    expect.assertions(1)

    try {
      await User.register({
        ...newUser,
        password: "password",
      })
      await User.register({
        ...newUser,
        password: "password",
      })
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy()
    }
  })
})

/************************************** get */

describe("get", function () {
  test("can fetch a user by username", async function () {
    const user = await User.get("lebron")
    expect(user).toEqual({
      username: "lebron",
      firstName: "Lebron",
      lastName: "James",
      email: "lebron@james.io",
      isAdmin: false,
    })
  })
  test("not found if no such user", async function () {
    expect.assertions(1)

    try {
      await User.get("nope")
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy()
    }
  })
})
