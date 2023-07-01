const pool = require('./database.js')
const bcrypt= require('bcrypt')
const crypto= require('crypto')
const jwt= require('jsonwebtoken')
const secretKey = crypto.randomBytes(64).toString('hex')


class User {
    // constructor (name) {
    //     this.name = name;
    //     thi
    // }


    static async getUser(email, password){


    }
    // /**
    //  * 
    //  * returns name from database 
    //  */
    // static async getName (name) {
    //    try{
    //         const result = await pool.query(`SELECT name FROM users WHERE name=$1`,[name]) //running
    //         // console.log()
    //         return result
    //    } catch(error)  {
    //         console.error({error: error.message})
    //    }
    // }

    static async login(email, password){
        try{
            const result= await pool.query(`SELECT 
                email,
                username,
                firstname,
                lastname,
                password
                FROM users WHERE email=$1`,
                [email.toLowerCase()]
            )

            const user= result.rows[0]
            if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password)
    
                if (isPasswordValid) {
                    return user
                }
            }

        } catch(err) {
            return {err: `Incorrect username or password!`}
        }
    }

    static async register(email, username, firstname, lastname, password) {
        console.log('register method', email)
        try{
            const userEmail= await pool.query(`SELECT email FROM users WHERE email=$1`, [email.toLowerCase()])
            
            if (!userEmail.rows[0]){

                const salt= bcrypt.genSalt(10);
                const hashedPassword= await bcrypt.hash(user.password, salt)

                const newUSER= await pool.query(`INSERT INTO 
                    users (
                    email,
                    username,
                    firstname,
                    lastname,
                    password
                    )
                    VALUES(
                        $1,
                        $2,
                        $3,
                        $4
                    )
                    RETURNING *`, [email, firstname, lastname, hashedPassword])
                    return newUSER.rows[0]
            }
        } catch(err){
            // console.log(err)
            return {err: `Incorrect username or password!`}
        }
    }

    static async addSleep(email, password, startTime, endTime){
        try{
            const newUSER= await pool.query(`INSERT INTO 
                    sleep (
                    email,
                    password,
                    start_time,
                    end_time
                    )
                    VALUES(
                        $1,
                        $2,
                        $3,
                        $4
                    )
                    RETURNING firstname`, [email, password, startTime, endTime])
                    return newUSER.rows[0]
            } catch(err){
                console.log(err)
            }
        }

    static async generateAuthToken(user) {
        const payload = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            emailaddress: user.emailaddress
        }

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
        return token
    }

    static async verifyAuthToken(token) {
        try {
            const decoded = jwt.verify(token, secretKey)
            return decoded
        } catch (err) {
            return null
        }
    }

    }


module.exports = User