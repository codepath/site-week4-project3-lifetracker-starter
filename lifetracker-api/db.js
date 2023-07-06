const { Client } = require("pg")
const {getDatabaseURI} = require ("./config")
require("colors")

//Create a new Client instance using the getDatabaseURI() function.
const db= new Client ({ connectionString: getDatabaseURI()})

//Establish a connection to the PostgreSQL database using the Client instance.
db.connect((err) => {
    if (err) { //if there is an error
        console.error("connection error".red, err.stack)
    }else{
        console.log("Successfully connected to postgress db!".blue)
    }
})

module.exports = db