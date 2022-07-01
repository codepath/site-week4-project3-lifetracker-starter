const bcrypt = require("bcrypt")
const db = require("../db")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { BadRequestError, UnauthorizedError} = require("../utils/errors")

class User {

    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            created_at: user.created_at
        }
    }

    static async login(credentials) {
        //  user should submit their email and password
        //  if any credential is missing, throw error
        const requiredFields = ["email", "password"]
        requiredFields.forEach((field) => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })
        //  match the given credentials to those stored in the database
        const user = await User.fetchUserByEmail(credentials.email)

        //  compare password for found user
        //  if successful, return user
        if(user){
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if(isValid) {
                return User.makePublicUser(user)
            }
        }

        //  otherwise, throw Unauthorized Error
        throw new UnauthorizedError("Invalid email or password")
    }

    static async register(credentials) {
        // user should submit their user info
        //  if any of the credentials is missing, throw error
        const requiredFields = ["email", "password", "firstName", "lastName", "username", "created_at"]
        requiredFields.forEach((field) => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })

        //  if the provided email has an incorrect format, throw an error
        if (credentials.email.indexOf("@") < 0){
            throw new BadRequestError("Invalid email")
        }

        //  if the email is already within the database, throw error
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if(existingUser){
            throw new BadRequestError(`${credentials.email} already in use`)
        }

        //  Hash the retreived password
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
        
        //  otherwise, generate a user profile and append it to the users list
        const lowercasedEmail = credentials.email.toLowerCase()

        const result = await db.query(`
            INSERT INTO users (
                email,
                username,
                password,
                first_name,
                last_name,
                created_at
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING  id, email, username, first_name, last_name, password, created_at;
        `, [lowercasedEmail, credentials.username, hashedPassword, credentials.firstName, credentials.lastName, credentials.created_at]) 

        const user = result.rows[0]
        
        return User.makePublicUser(user)
    }

    static async fetchUserByEmail(email) {
        if (!email){
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }
}

module.exports = User