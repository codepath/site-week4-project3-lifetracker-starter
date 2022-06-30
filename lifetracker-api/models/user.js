const bcrypt = require('bcrypt')
const db = require('../db')
const {BCRYPT_WORK_FACTOR} = require('../config')
const {BadRequestError, UnauthorizedError} = require('../utils/errors')

class User
{
    //METHOD FOR RETURNING PUBLIC USER TO CLIENT WITH SECURITY HAZARDS
    static async makePublicUser(user)
    {
        return{
            id: user.id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
        }
    }

    //METHOD FOR SUCCESSFUL LOGIN CREDENTIALS
    static async login(credentials)
    {
        //ERROR CHECKING FOR PROPER EMAIL AND PASSWORD CREDENTIALS
        const requiredFields = ["email", "password"]
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field))
            {
                throw new BadRequestError(`Missing ${field} in request`)
            }
        })
        const user = await User.fetchUserByEmail(credentials.email)
        if(user)
        {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if(isValid)
            {
                return User.makePublicUser(user)
            }
        }

        throw new UnauthorizedError("Whoops, Invalid email / password")
    }




    //METHOD FOR SUCCESSFUL REGISTER CREDENTIALS
    static async register(credentials)
    {
        //ERROR HANDLING FOR REQUIRED FIELDS AND PROPER EMAIL AND EXISTENCE OF EMAIL
        const requiredFields = ["username", "password", "firstName", "lastName", "email"]
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field))
            {
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })

        if(credentials.email.indexOf('@') <= 0)
        {
            throw new BadRequestError('Invalid Email')
        }

        const existingUser = await User.fetchUserByEmail(credentials.email)
        if(existingUser)
        {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }

        //PROPER REGISTRATION INFORMATION INPUTTED, THEN PROCREED WITH CREATION
        const hashedPw = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
        const lowercasedEmail = credentials.email.toLowerCase()

        const results = await db.query(`
            INSERT INTO users(
                username,
                password,
                first_name,
                last_name,
                email
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, password, first_name, last_name, email, created_at, updated_at
        `, [credentials.username, hashedPw, credentials.firstName, credentials.lastName, lowercasedEmail])
        

        //RETURN THE USER
        const user = results.rows[0]
        return User.makePublicUser(user)
    }




    //METHOD FOR FINDING SPECIFIC EMAILS
    static async fetchUserByEmail(email)
    {
        if(!email)
        {
            throw new BadRequestError("No email provided.")
        }

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()])
        const user = result.rows[0]
        return user
    }
}

module.exports = User