require("colors");
require("dotenv").config();
// const crypto = require("crypto");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const secretKey = process.env.SECRET_KEY || "secret_dev"


// const IS_TESTING = process.env.NODE_ENV === "test"

function getDatabaseUri() {
  const dbUser = process.env.PG_USER || "postgres";
  const dbPass = process.env.PG_PASSWORD
    ? encodeURI(process.env.PG_PASSWORD)
    : "postgres";
  const dbHost = process.env.PG_HOST || "local";
  const dbPort = process.env.PG_PORT || 5432;
//   const dbTestName = process.env.DATABASE_TEST_NAME || "vaccine_hub_test";
  const dbProdName = process.env.PG_DATABASE || "life_tracker";
//   const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName;

  return (
    process.env.PG_URL ||
    `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbProdName}`
  );
}

const BCRYPT_WORK_FACTOR =  13;

console.log("Life Tracker Config:".red);
console.log("PORT:".blue, PORT);
console.log("SECRET_KEY:".blue, secretKey);
// console.log("BCRYPT_WORK_FACTOR".blue, BCRYPT_WORK_FACTOR);
console.log("Database:".blue, getDatabaseUri());
console.log("---");

module.exports = {
  PORT,
  secretKey,
//   IS_TESTING,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri
};
