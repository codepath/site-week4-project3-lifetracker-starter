const bcrypt = require("bcrypt")
const nanoid = require("nanoid")
// const gravatar = require("gravatar")
const { storage } = require("../../db/storage")
const { BCRYPT_WORK_FACTOR } = require("../../config")

async function commonBeforeAll() {
  storage.db.setState({ users: [], listings: [], transactions: [] })

  const userObject = {
    userId: nanoid.nanoid(),
    username: "lebron",
    firstName: "Lebron",
    lastName: "James",
    email: "lebron@james.io",
    password: await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
    isAdmin: false,
    // avatar: gravatar.url("u1@email.com", { s: "400" }),
  }

  storage.get("users").push(userObject).write()

  const userObject2 = {
    userId: nanoid.nanoid(),
    username: "serena",
    firstName: "Serena",
    lastName: "Williams",
    email: "serena@williams.io",
    password: await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
    isAdmin: true,
    // avatar: gravatar.url("u2@email.com", { s: "400" }),
  }

  storage.get("users").push(userObject2).write()
}

async function commonBeforeEach() {
  // await db.query("BEGIN")
}

async function commonAfterEach() {
  // await db.query("ROLLBACK")
}

async function commonAfterAll() {
  // await db.end()
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
}
