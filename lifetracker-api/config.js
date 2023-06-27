require('dotenv').config()
require('colors')

const PORT = process.env.PORT || 3000
// const IS_TESTING = process.env.NODE_ENV == "test";

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER
    const dbPass = process.env.DATABASE_PASS
    const dbHost = process.env.DATABASE_HOST
    const dbPort = process.env.DATABASE_PORT
    const dbName = process.env.DATABASE_NAME
}

