const { Client } = require("pg")
const { getDatabaseURL } = require("./config")
require("colors")

const db = new Client({ connectionString: getDatabaseURL() })

db.connect((error) => {
    if (error) {
        console.log("Connection Error".red, error.stack)
    } else {
        console.log("Successfully connected to Postgres DB!".blue)
    }
})

module.exports = db