"use strict"

/** Database setup for vaccine hub. */

const { Client } = require("pg")
const { getDatabaseUri } = require("./config")
require("colors")

const db = new Client({ connectionString: getDatabaseUri() })

db.connect((err) => {
  if (err) {
    console.error("connection error", err.stack)
  } else {
    console.log("Successfully connected to postgres database!".blue)
  }
})

module.exports = db
