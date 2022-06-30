require('dotenv').config()
require('colors')

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001

function getDatabaseUri() {
    const secretKey = process.env.SECRET_KEY || "WIUFHWIUFHWFENWEIOFAWIUFNAIWEUENAWWIOEUFOWI"
    const bcryptWorkFactor = process.env.BCRYPT_WORK_FACTOR || 13
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "lifetracker"

    // if the DATABASE_URL env. variable, use that.
    // otherwise, create the db connection string outselves

    return process.env.DATABASE_URL || `postgresql://${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

console.log("App Config".red)
console.log("PORT:".blue, PORT)
console.log("Database URI:".blue, getDatabaseUri())
console.log("---")

module.exports = {
    PORT,
    getDatabaseUri
}