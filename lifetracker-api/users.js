const pool = require('./database.js')

class User {
    static async register(input) {
        const {email, firstname, lastname, username, password} = input
        const newUSER = await pool.query(`INSERT INTO
        users (
        email,
        firstname,
        lastname,
        username,
        password    
        )
        VALUES(
            $1,
            $2,
            $3,
            $4,
            $5
        )
        RETURNING firstname`, [email, firstname, lastname, username, password])
        return newUSER.rows[0]
    }
}  

module.exports = User

