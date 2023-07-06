const db = require("../db")
const { BadRequestError,NotFoundError } = require("./utils/erros")
const bcrypt = require("bcrypt")
const {bcrypt_factor} = require("../config")

class User{

    static makePublicUser(user) {
        return {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
    }
    static async register (cred){
        const required = ["username", "password","firstname","lastname", "email" ] 
        required.forEach(field => {
            if (!cred.hasOwnProperty(field)) {
                throw new BadRequestError(`missing ${field} in request body`)
            }
        })
        //check if email is valid 
        if (cred.email.indexOf("@") <= 0 ){
            throw new BadRequestError("Invalid Email")
        }
        //checks if user exists
        const existingUser = await User.fetchUserByEmail(cred.email)
        if(existingUser){
            throw new BadRequestError(`Duplicate email: ${cred.email}`)
            
        }

        const existingUserName = await User.fetchUserByUserName(cred.username)
        if(existingUserName){
            throw new BadRequestError (`Username taken : ${credentials.username}`)
        }



        //take user password and hash it 
        const hashedPassword = await bcrypt.hash(cred.password, bcrypt_factor)

        //take user email and make it lowercase
        const lowerEmail = cred.email.toLowerCase()

        //create new user in database
        const result = await db.query(`
            INSERT INTO users (
                username,
                password,
                first_name,
                last_name,
                email,
            )
            VALUE ($1, $2, $3, $4, $5)
            RETURNING id,username, password, firstname,lastname, email;`,
        [cred.username,hashedPassword, cred.firstname, cred.lastname,lowerEmail])
        const user = result.rows[0]
        return user
    }

    //searches for user with given email
   static async fetchUserByEmail(email){
    if (!email){ //if no email is supplied throw an error npm
        throw new BadRequestError("no email provided")
    }
    const query = `SELECT * FROM users WHERE email = $1`
    const result = await db.query(query, [email.toLowerCase()])
    const user = result.rows[0]
    return user
   }

   static async fetchUserByUserName (username){
    if (!username){ //if no email is supplied throw an error npm
        throw new BadRequestError("no username provided")
    } 
    const query = `SELECT * FROM users WHERE username = $1`
    const result = await db.query(query, [username.toLowerCase()])
    const user = result.rows[0]
    return user
   }
    static async login (cred){
        const required = ["email", "password"] 
        required.forEach(field => {
            if (!cred.hasOwnProperty(field)) {
                throw new BadRequestError(`missing ${field} in request body`)
            }
        })
        const user = await User.fetchUserByEmail(cred.email)

        if(user){
            const isValid = await bcrypt.compare(cred.password, user.password)
            if(isValid){
                return user
            } 
        }
        throw new UnauthorizedError("Invalid email or password")
    }
}

module.exports = User