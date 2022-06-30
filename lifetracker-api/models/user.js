const bcrypt = require("bcrypt")
const db = require("../db")
const { BCRYPT_WORK_FACTOR } = require("../config")
const { UnauthorizedError, BadRequestError } = require("../utils/errors")

class User {

    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            location: user.location,
            date: user.date
        }
    }

    static async login(credentials) {
        // throw error if any crediential fields are missing
        const requiredFields = ["email", "password"]
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing ${field} in request body.`)            }
        })

        // look up user in database with email
        const user = await User.fetchUserByEmail(credentials.email)
        // if user is found
        if (user) {
            // compare the submitted password to the one in the database
            const isValid = await bcrypt.compare(credentials.password, user.password)
            // if there is a match, return the user
            if (isValid) {
                return User.makePublicUser(user)
            }
        }
        // else (user is not found), throw an error
        throw new UnauthorizedError("Incorrect email or password")
    }

    static async register(credentials) {
        // throw error if any credential fields are missing
        const requiredFields = ["email", "username","firstName", "lastName", "password"]
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if (credentials.email.indexOf('@') <= 0) {
            throw new BadRequestError("Invalid email.")
        }

        // if someone already has access to the system with the email, throw an error
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }
        
        // take the password and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)

        // take the email and lowercase it
        const lowercasedEmail = credentials.email.toLowerCase()

        // take username and lowercase it
        const lowercasedUsername = credentials.username.toLowerCase()

        // create a new user in the database with their info
        const result = await db.query(`
            INSERT INTO users (
                username,
                password,
                first_name,
                last_name,
                email,
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING username, password, first_name, last_name, email;
        `, [lowercasedUsername, hashedPassword, credentials.firstName, credentials.lastName, lowercasedEmail])

        // return the user
        const user = result.rows[0]
        return User.makePublicUser(user)

    }

    // look up user by their email
    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()])
        // grab first row and return 
        const user = result.rows[0]

        return user
    }
}

module.exports = User