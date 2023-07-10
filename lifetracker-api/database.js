const { Pool } = require("pg");
const { getDatabaseUri } = require("./config");

const db = new Pool({
  connectionString: getDatabaseUri(),
});

db.connect((err) => {
  if (err) console.error(("Connection error", err));
  else {
    console.log("Successfully connected to postgres db!");
  }
});

module.exports = db;
