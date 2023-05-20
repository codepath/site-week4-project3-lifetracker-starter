const bcrypt = require("bcrypt")
const nanoid = require("nanoid")
const { storage } = require("../db/storage")
const { BCRYPT_WORK_FACTOR } = require("../config")

const seedUsers = async (testing = true) => {
  if (testing) {
    process.env.NODE_ENV = "test"
  }

  storage.db.setState({ users: [], listings: [], transactions: [] })

  // console.log(await bcrypt.hash("password1", BCRYPT_WORK_FACTOR))

  await bcrypt.hash("password1", BCRYPT_WORK_FACTOR)

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
    email: "serena@williams.com",
    password: await bcrypt.hash("password", BCRYPT_WORK_FACTOR),
    isAdmin: true,
    // avatar: gravatar.url("u2@email.com", { s: "400" }),
  }

  storage.get("users").push(userObject2).write()

  const u1 = storage.get("users").find({ email: "lebron@james.io" }).value()
  console.log(u1)

  const nouser = storage.get("users").find({ email: "nouser@james.io" }).value()
  console.log(nousernode)
}

seedUsers()
