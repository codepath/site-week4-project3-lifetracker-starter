require ("dotenv").config()
require("colors")

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY ? process.env.SECRET_KEY : "DFJK123"

function getDatabaseURI() {
    const dbUser = process.env.DATABASE_USER || "postgre"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgre"
    const dbHost = process.env.DATABASE_HOST|| "localhost"
    const dbPort = process.env.DATABASE_PORT|| 5432
    const dbName = process.env.DATABASE_NAME|| "vaccine_hub"

    //if 

    return process.env.DATATBASE_URL || `postgresql://${dbUser}:${dbPass}:@${dbHost}:${dbPort}/${dbName}`
}
const bcrypt_factor = 13

//console.log("process.env".red, Object.keys(process.env))
console.log("App Config".cyan)
console.log("PORT:".yellow, PORT)
console.log("Database URI:".green, getDatabaseURI())
console.log("---".blue)

module.exports ={
    PORT,
    SECRET_KEY,
    bcrypt_factor,
    getDatabaseURI
} 