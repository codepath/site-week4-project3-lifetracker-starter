const db = require("../db")
const bcyrpt = require("bcry pt")
const {validateFields} = require("../utils/validate")
const { BadRequestError } = require("../utils/errors")
const {BCRYPT_WORK_FACTOR}=require("../config")

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
        
        const requiredFields = ["email","password","firstName","lastName","location","date"]
        requiredFields.forEach(field=>{
            if(!creds.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)

            }
        })
        if (creds.email.indexOf("@")<=0){
            throw new BadRequestError("invalid email.")
        }
       const existingUser=await user.fetchUserByEmail(creds.email)
       if (existingUser){
        throw new BadRequestError(`Duplicate email: ${creds.email} `)
       }
       const hashedPassword=await bcyrpt.hash(creds.password.BCRYPT_WORK_FACTOR)
       const lowerCasedEmail=credential.email.toLowerCase()

       const result =  await db.query(`
       INSERT INTO users(
        email,
        password,
        firstName,
        LastName,
        location,
        date)
        VALUES($1, $2 , $3 , $4, $5 ,$6)
        RETURNING id, email , firstName, LastName,location,   date
       `)
       [lowerCasedEmail, hashedPassword, creds.firstName, creds.lastName,creds.location, creds.date]


    }

    //
    static async fetchUserByEmail(email){
        if (!email){
            throw new BadRequestError("No email provided")
        }
        const query = await db.query(
        `SELECT * FROM users WHERE email=$1`
    
        )
        const result=await db.query(query,[email.toLowerCase()])
        const user = result.rows[0]
        return user
    }
}

module.exports=user