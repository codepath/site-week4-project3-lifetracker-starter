const jwt = require("jsonwebtoken")
const { createUserJwt } = require("./tokens")
const { SECRET_KEY } = require("../config")

describe("createToken", function () {
  test("works: not admin", function () {
    const token = createUserJwt({ email: "test", username: "test", isAdmin: false })
    const payload = jwt.verify(token, SECRET_KEY)
    expect(payload).toEqual({
      iat: expect.any(Number),
      email: "test",
      username: "test",
      isAdmin: false,
    })
  })

  test("works: admin", function () {
    const token = createUserJwt({ email: "test", username: "test", isAdmin: true })
    const payload = jwt.verify(token, SECRET_KEY)
    expect(payload).toEqual({
      iat: expect.any(Number),
      email: "test",
      username: "test",
      isAdmin: true,
    })
  })

  test("works: default no admin", function () {
    // given the security risk if this didn't work, checking this specifically
    const token = createUserJwt({ email: "test", username: "test" })
    const payload = jwt.verify(token, SECRET_KEY)
    expect(payload).toEqual({
      iat: expect.any(Number),
      email: "test",
      username: "test",
      isAdmin: false,
    })
  })
})
