require('dotenv').config() //importing dependecies; config makes its
const {Pool} = require('pg')


const pool = new Pool({uri: "postgres://lifetracker_db_ecrp_user:lymNViRC0EOdCPXKuhBolv0OdrjItoo8@dpg-cikgbb5gkuvinfivudo0-a/lifetracker_db_ecrp"})


module.exports = pool

// {
//     user: process.env.PG_USER, //node js builtin; process=unit of software?; just accessing what's in the .env file
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT
// }