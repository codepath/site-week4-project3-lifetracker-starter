const db = require("../db")
const bcrypt = require("bcrypt")
const {validateFields} = require("../utils/validate")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
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
            // location : user.location, 
            // date : user.date
        }
    }

    //authentification function-authenticates given user credentials
    static async authenticate(creds){
        const {email, password} = creds
        console.log(creds)
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
            const isValid = await bcrypt.compare(password, user.password)
            if(isValid == true){
                return User.createPublicUser(user) //returns desired user information to frontend
            }
        }else{
            //throw an error here
          console.log("user doesn't exist")
            throw new UnauthorizedError("invalid username or password")
        }
        //throw unauthorized error if not validated
        //throw new UnauthorizedError()
    }

    //register function 
    static async register(creds){
        
        const requiredFields = ["email","password","first_name","last_name","username"]
        requiredFields.forEach(field=>{
            if(!creds.hasOwnProperty(field)){
               throw new BadRequestError(`Missing ${field} in request body`)
            }
        })
        if (creds.email.indexOf("@")<=0){
            throw new BadRequestError("invalid email.")
        }
       const existingUser=await User.fetchUserByEmail(creds.email)
       if (existingUser){
        throw new BadRequestError(`Duplicate email: ${creds.email} `)
       }
       const hashedPassword=await bcrypt.hash(creds.password,BCRYPT_WORK_FACTOR)
       const lowerCasedEmail=creds.email.toLowerCase()

       //adding user information into the database
       const result =  await db.query(`
       INSERT INTO users(
        email,
        password,
        first_name,
        last_name,
        username)
        VALUES($1, $2, $3, $4, $5)
        RETURNING id, email, first_name, last_name, username
       `, [lowerCasedEmail, hashedPassword, creds.first_name, creds.last_name, creds.username])
      // [lowerCasedEmail, hashedPassword, creds.firstName, creds.lastName,creds.location, creds.date]

        const user = result.rows[0]; 
        return user; 
    }

    static async fetchUserByEmail(email){
    //     if (!email){
    //         throw new BadRequestError("No email provided")
    //     }
    //     const query = await db.query(
    //     `SELECT * FROM users WHERE email=$1`
    //     )
    //     const result=await db.query(query,[email.toLowerCase()])
    //     const user = result.rows[0]
    //     return user
    // }
        const result = await db.query(
        `SELECT id,
                email,
                password,
                first_name AS "firstName",
                last_name AS "lastName",
                username
            
        FROM users WHERE email = $1`,[email.toLowerCase()]
        )
        const user = result.rows[0]
        return user; 
    }

}

module.exports= User