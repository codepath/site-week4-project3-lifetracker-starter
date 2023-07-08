require("colors");
require("dotenv").config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const secretKey = process.env.SECRET_KEY || "secret_dev"

function getDatabaseUri() {
  const dbUser = process.env.PG_USER || "postgres";
  const dbPass = process.env.PG_PASSWORD
    ? encodeURI(process.env.PG_PASSWORD)
    : "postgres";
  const dbHost = process.env.PG_HOST || "local";
  const dbPort = process.env.PG_PORT || 5432;
  const dbProdName = process.env.PG_DATABASE || "life_tracker";

  return process.env.PG_URL ||`postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbProdName}`
  ;
}

const BCRYPT_WORK_FACTOR =  13;

console.log("Life Tracker Config:".red);
console.log("PORT:".blue, PORT);
console.log("SECRET_KEY:".blue, secretKey);
console.log("Database:".blue, getDatabaseUri());
console.log("---");

module.exports = {
  PORT,
  secretKey,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri
};
