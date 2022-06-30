const { Client } = require("pg")  // import client from pg package (node postgres package)
const { getDatabaseUri } = require("./config")
require("colors")

// create a new instance of Client
// pass constructor single object containing the database uri
const db = new Client({ connectionString: getDatabaseUri() })

db.connect((err) => {
    if (err) {
        console.error("connection error".red, err.stack)
    } else {
        console.log("Successfully connected to Postgres DB !!!".america)
    }
})

module.exports = db