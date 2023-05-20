"use strict"

/** Shared config for application; can be required many places. */

require("dotenv").config()
require("colors")

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev"

const PORT = +process.env.PORT || 3001
const IS_TESTING = process.env.NODE_ENV === "test"

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres"
  const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
  const dbHost = process.env.DATABASE_HOST || "local"
  const dbPort = process.env.DATABASE_PORT || 5432
  const dbTestName = process.env.DATABASE_TEST_NAME || "lifetracker_test"
  const dbProdName = process.env.DATABASE_NAME || "lifetracker"
  const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName

  return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13

console.log("Life Tracker Config:".green)
console.log("SECRET_KEY:".yellow, SECRET_KEY)
console.log("PORT:".yellow, PORT.toString())
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR)
console.log("Database:".yellow, getDatabaseUri())
console.log("---")

module.exports = {
  IS_TESTING,
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
}
