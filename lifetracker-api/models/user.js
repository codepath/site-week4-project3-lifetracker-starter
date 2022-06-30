const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const bcrypt = require("bcrypt")
require("dotenv").config()

const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR ? Number(process.env.BCRYPT_WORK_FACTOR) : 13



class User {
    // not putting async for now
    static async login(information) {
        // only need information to contain email and password to log in successfully

        if (!information)
        {
            throw new BadRequestError("No object passed through to log in.");
        }

        const requiredFields = ["email", "password"]
        requiredFields.forEach((field) => {
            if (!information.hasOwnProperty(field))
            {
                throw new BadRequestError(`The field: "${field}" is missing from the object passed in to log in`)
            }
        })
        const maybeUserExists = await User.fetchUserByEmail(information.email)
        if (maybeUserExists)
        {
            const isValid = await bcrypt.compare(information.password, maybeUserExists.password)
            if (isValid)
            {
                return User.returnPublicUser(maybeUserExists);
            }
        }
        throw new UnauthorizedError("Email/Password were incorrect/invalid combination")

    }

    static async register(information) {
        console.log("entered register function", BCRYPT_WORK_FACTOR)

        if (!information)
        {
            throw new BadRequestError("No object passed through to register (sign up).")
        }

        const requiredFields = ["username", "first_name", "last_name", "email", "password"]

        requiredFields.forEach((field) => {
            if (!information.hasOwnProperty(field))
            {
                throw new BadRequestError(`The field: "${field}" is missing from the object passed in to register`)
            }
        })

        if (information.email.indexOf("@") <= 0) {
            throw newBadRequestError("Invalid email passed when trying to register.");
        }

        const maybeUserExistsEmail = await User.fetchUserByEmail(information.email)
        const maybeUserExistsUsername = await User. fetchUserByUsername(information.username)
        if (maybeUserExistsEmail || maybeUserExistsUsername)
        {
            // should not enter because we are registering...
            throw new BadRequestError("Email/Username already exists in our system. Try logging in.")
        }
        
        const hashedPassword = await bcrypt.hash(information.password, BCRYPT_WORK_FACTOR)
       
 // const requiredFields = ["username", "first_name", "last_name", "email", "password"]

        const text = 
        `INSERT INTO users (
            username, 
            first_name,
            last_name,
            email,
            password)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, username, first_name, last_name, email, created_at, updated_at`;
        const values = [information.username,
                        information.first_name,
                        information.last_name,
                        information.email.toLowerCase(),
                        hashedPassword]
        
        const result = await db.query(text, values);   
        return User.returnPublicUser(result.rows[0]);
    }
    
    static async fetchUserByEmail(email) {
        if (!email)
        {
            throw new BadRequestError("No email passed through");
        }
        const text = `SELECT * FROM users WHERE email=$1`;
        const values = [email.toLowerCase()];
        const result = await db.query(text, values);
        return result.rows[0];  // this is the user with that email
    }

    static async fetchUserByUsername(username) {
        if (!username)
        {
            throw new BadRequestError("No username passed through");
        }
        const text = `SELECT * FROM users WHERE username=$1`;
        const values = [username.toLowerCase()];
        const result = await db.query(text, values);
        return result.rows[0];  // this is the user with that username
    }

    static returnPublicUser(userWithAllAttributes) {
        return {
            id: userWithAllAttributes.id,
            username: userWithAllAttributes.username,
            email: userWithAllAttributes.email,
            first_name: userWithAllAttributes.first_name,
            last_name: userWithAllAttributes.last_name}
    }
}


module.exports = User