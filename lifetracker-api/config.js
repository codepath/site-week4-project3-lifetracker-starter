require('dotenv').config()
require('colors')

//.ENV VARIABLES

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR ? Number(process.env.BCRYPT_WORK_FACTOR) : 13;
const SECRET_KEY = process.env.SECRET_KEY;


function getDatabaseUri()
{
    const dbUser = process.env.DATABASE_USER || 'postgres';
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : 'postgres';
    const dbHost = process.env.DATABASE_HOST || 'localhost';
    const dbPort = process.env.DATABASE_PORT || 5432;
    const dbName = process.env.DATABASE_NAME || 'lifetracker';
    const dbTestName = process.env.DATABASE_TEST_NAME || 'lifetracker_test'

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}


//console.log("process.env".yellow, Object.keys(process.env))
console.log("App Config".red)
console.log("PORT:".blue, PORT)
console.log("Database URI:".blue, getDatabaseUri())
console.log("---")

module.exports = {
    PORT,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri
}