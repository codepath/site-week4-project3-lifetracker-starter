// require('dotenv').config()
const { Pool } = require("pg");
const { getDatabaseUri } = require("./config");

const db = new Pool({
  connectionString: getDatabaseUri(),
});

// user: process.env.PG_USER,
// host: process.env.PG_HOST,
// database: process.env.PG_DATABASE,
// password: process.env.PG_PASSWORD,
// port: process.env.PG_PORT
db.connect((err) => {
  if (err) console.error(("connectiong error", err));
  else {
    console.log("Successfully connected to postgres db!");
  }
});

module.exports = db;
