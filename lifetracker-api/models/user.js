const db = require("../db")
const bcyrpt = require("bcyrpt")
const {validateFields} = require("../utils/validate")

class User{
    //convert user from database into a user object that can be manipulated and viewed publically

    //creates a user oject that holds values from database
    static createPublicUser(user){
        return{
            id: user.id, 
            firstName : user.firstName,
            lastName : user.lastName, 
            email : user.email, 
            location : user.location, 
            date : user.date
        }
    }

    //authentification function-authenticates given user credentials
    static async authenticate(creds){
        const {email, password} = creds
        const requiredCreds = ["email", "password"]
        //checking if user provided required credentials-email and password
        try{
            
            validateFields({required: requiredCreds, obj: creds, location: "user authentication"})

        } catch(err){
            throw err
        }

        //calls fetch function and if the email parameter matches an email
        //in the database then returns a user object
        const user = await User.fetchUserByEmail(email)

        if(user){
            //compares user given password to hashed password in db
            const isValid = await bcyrpt.compare(password, user.password)
            if(isValid == true){
                return User.createPublicUser(user)
            }
        }
        //throw unauthorized error if not validated
    }

    //register function 
    static async register(creds){
        const {email, password, firstName,lastName, location, date} = creds;
        const requiredCreds = ["email","password","firstName","lastName","location","date"]
    }

    //
    static async fetchUserByEmail(email){
        const result = await db.query(
        `SELECT id, 
                email,
                password,
                first_name AS "firstName",
                last_name AS "lastName",
                location,
            xdate
        FROM users WHERE email = $1`,[email.toLowerCase()]
        )

        const user = result.rows[0]
    }
}

module.exports = User;