const bcrypt = require("bcrypt")
const db = require("../db")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {UnauthorizedError, BadRequestError} = require('../utils/errors')

class User{
    static async login(credentials){
        //list of required fields
        const requiredFields = ["email","password"]

        //check if each field is present
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError( `Mising ${field} in request body.`)
            }
        })

        //check if email is valid
        if(credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid Email")
        }

        //check if user exists
        const existingUser = await User.fetchUserByEmail(credentials.email)

        //if user does not exist throw an error
        if(!existingUser){
            throw new UnauthorizedError(`Email or Password Invalid`)
        }

        //return existingUser
        return {
            "id" : existingUser.id,
            "email": existingUser.email,
            "first_name": existingUser.first_name,
            "last_name": existingUser.last_name
        }
    }

    static async register(credentials){
        //list of required fields 
        const requiredFields = ["username", "password", "first_name", "last_name", "email",]


        //check if each field is present
        requiredFields.forEach(field => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError( `Mising ${field} in request body.`)
            }
        })

        //check if email is valid
        if(credentials.email.indexOf("@") <= 0){
            throw new BadRequestError("Invalid Email")
        }

        //check if user exists
        const existingUser = await User.fetchUserByEmail(credentials.email)

        const existingUser_name = await User.fetchUserByUsername(credentials.username)

        //if user exists throw an error
        if(existingUser){
            throw new BadRequestError(`Duplicate email : ${credentials.email}`)
        }

        //if user exists throw an error
        if(existingUser_name){
            throw new BadRequestError(`Username taken : ${credentials.username}`)
        }

        const result = await db.query(`
        INSERT INTO users(
            username,
            password,
            first_name,
            last_name,
            email
        ) VALUES(
            $1,
            $2,
            $3,
            $4,
            $5
        ) RETURNING id, username, first_name, last_name, email;
        `, [credentials.username, credentials.password, credentials.first_name, credentials.last_name, credentials.email])

        return result.rows[0]

    }

    static async fetchUserByEmail(email){

    if(!email) throw new BadRequestError("email field empty")
        
    const loweredEmail = email.toLowerCase()

    const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [loweredEmail])

    return result.rows[0]
}

    static async fetchUserByUsername(username){
    if(!username) throw new BadRequestError("email field empty")
        
    const loweredUsername = username.toLowerCase()

    const result = await db.query(`SELECT * FROM users WHERE username = $1;`, [loweredUsername])

    return result.rows[0]
    }
}
module.exports = User