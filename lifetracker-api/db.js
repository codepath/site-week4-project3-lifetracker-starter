const {Client} = require('pg')
const {getDatabaseUri} = require('./config')
require('colors')

const db = new Client({ connectionString : getDatabaseUri() })

db.connect((error) => {
    if(error)
    {
        console.error("Connection error".red, error.stack)
    }
    else{
        console.log("Successfully connected!")
    }
})

module.exports = db;