require("dotenv").config
//require("colors")

//to use values from .env need to put them into this folder
const PORT = process.env.PORT ? Number(process.env.PORT):3001

function getDatabaseUri(){
   const dbUser = process.env.DATABASE_USER || "postgres"
   const dbPass = process.env.DATABASE_PASS? encodeURI(process.env.DATABASE_PASS) : "postgres" //checks if password does exist then encode it
   const dbHost = process.env. DATABASE_HOST || "localhost"
   const dbPort = process.env.DATABASE_PORT || "5432"
   const dbName = process.env.DATABASE_NAME || "lifetracker"
   // DATABASE_TEST_NAME=lifetracker_test

   const dbHostedURL = process.env.DATABASE_HOSTED_URL
   //if user supplies database url use that else make it yourself
  return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}` //full database connection string
  // return process.env.DATABASE_HOSTED_URL
}
const BCRYPT_WORK_FACTOR=13
const SECRET_KEY="waliaibex23"

console.log(getDatabaseUri())
module.exports = {
    PORT,
    getDatabaseUri,
    BCRYPT_WORK_FACTOR
}