const { Client } = require("pg")
const { getDatabaseUri } = require('./config')
const db = new Client({ connectionString: getDatabaseUri() })

require('colors')
db.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('Successfully connected to postgres database!'.green)
    }
})

module.exports = db