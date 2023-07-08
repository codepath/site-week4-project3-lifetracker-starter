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
                    console.log('user', user)
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
            console.log('yo')

                const salt= await bcrypt.genSalt(10);
                const hashedPassword= await bcrypt.hash(password, salt)

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
                        $4,
                        $5
                    )
                    RETURNING *`, [email, username, firstname, lastname, hashedPassword])
                    console.log('user', newUSER.rows[0])
                    return newUSER.rows[0]
            }
        } catch(err){
            console.log(err)
            return {err: `Incorrect username or password!`}
        }
    }

    static async addSleep(email, startTime, endTime){
        try{
            const newUSER= await pool.query(`INSERT INTO 
                    sleep (
                    email,
                    start_time,
                    end_time
                    )
                    VALUES(
                        $1,
                        $2,
                        $3 
                    )
                    RETURNING *`, [email, startTime, endTime])
                    // console.log(newUSER.rows[0])
                    return newUSER.rows[0]
            } catch(err){
                console.log(err)
            }
        }


    static async addExercise(email, name, category, duration, intensity){
        try{
            const newUSER= await pool.query(`INSERT INTO 
                    exercise (
                    email,
                    name,
                    category,
                    duration,
                    intensity
                    )
                    VALUES(
                        $1,
                        $2,
                        $3,
                        $4,
                        $5
                    )
                    RETURNING *`, [email, name, category, duration, intensity])
                    return newUSER.rows[0]
            } catch(err){
                console.log(err)
            }
        }

    static async addNutrition(email, name, category, quantity, calories, url=''){
        try{
            const newUSER= await pool.query(`INSERT INTO 
                    nutrition (
                        email,
                        name,
                        category,
                        quantity,
                        calories,
                        url
                    )
                    VALUES(
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6
                    
                    )
                    RETURNING *`, [email, name, category, quantity, calories, url])
                    return newUSER.rows[0]
            } catch(err){
                console.log(err)
            }
        }
        


    static async getExerciseByEmail(email){
        try{
            const exercise= await pool.query(`SELECT 
            *
            FROM exercise
            WHERE email=$1`,
            [email.toLowerCase()])
            console.log('old ex', exercise.rows)
            return exercise.rows
        } catch(e){
            return {error: e.message}
        }
    }    
    
    static async getSleepByEmail(email){
        // console.log("is here")
        try{
            // console.log("is actually here")
            // console.log(email)
            const sleep= await pool.query(`SELECT 
            *
            FROM sleep
            WHERE email=$1`,
            [email.toLowerCase()])
            console.log('sleeeeep',sleep.rows)
            // console.log(email, "email in sleep ")
            return sleep.rows
            
        } catch(e){
            return {error: e.message}
        }
    } 

    static async getNutritionByEmail(email){
        try{
            const nutrition= await pool.query(`SELECT 
            *
            FROM nutrition
            WHERE email=$1`,
            [email.toLowerCase()])

            return nutrition.rows
        } catch(e){
            return {error: e.message}
        }
    }    
    
    static generateAuthToken(user) {
        const payload = {
            email: user.email,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password
        }

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
        return token
    }

    static verifyAuthToken(token) {
        try {
            const decoded = jwt.verify(token, secretKey)
            return decoded
        } catch (err) {
            return null
        }
    }

    }


module.exports = User