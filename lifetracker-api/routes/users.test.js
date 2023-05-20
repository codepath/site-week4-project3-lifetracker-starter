"use strict"

const request = require("supertest")
const app = require("../app")

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  lebronToken,
  jloToken,
  adminToken,
} = require("../tests/routes/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

/************************************** GET /users/:username */

describe("GET /users/:username", function () {
  test("Admin can access user info", async function () {
    const resp = await request(app).get(`/users/lebron/`).set("authorization", `Bearer ${adminToken}`)
    expect(resp.body).toEqual({
      user: {
        username: "lebron",
        firstName: "Lebron",
        lastName: "James",
        email: "lebron@james.io",
        isAdmin: false,
      },
    })
  })

  test("Same user can access their own info", async function () {
    const resp = await request(app).get(`/users/lebron/`).set("authorization", `Bearer ${lebronToken}`)
    expect(resp.body).toEqual({
      user: {
        username: "lebron",
        firstName: "Lebron",
        lastName: "James",
        email: "lebron@james.io",
        isAdmin: false,
      },
    })
  })

  test("Throws Unauthorized error when other user tries to access info", async function () {
    const resp = await request(app).get(`/users/lebron/`).set("authorization", `Bearer ${jloToken}`)
    expect(resp.statusCode).toEqual(401)
  })

  test("Throws Unauthorized error when no user currently authenticated", async function () {
    const resp = await request(app).get(`/users/lebron/`)
    expect(resp.statusCode).toEqual(401)
  })

  test("Throws NotFound error when user doesn't exist", async function () {
    const resp = await request(app).get(`/users/nope/`).set("authorization", `Bearer ${adminToken}`)
    expect(resp.statusCode).toEqual(404)
  })
})
