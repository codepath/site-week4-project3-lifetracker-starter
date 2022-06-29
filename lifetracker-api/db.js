const { Client } = require("pg")
const { getDatabaseUri } = require("./config")
require("colors")

const db = new Client({connectionString: getDatabaseUri()});

db.connect((error) => {
    if (error)
    {
        console.error("connection error".red, error.stack);
    }
    else
    {
        console.log("Successfully connected to postgres db!".blue);
    }
})

module.exports = db