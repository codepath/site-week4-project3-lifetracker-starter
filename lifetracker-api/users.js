const pool = require('./database.js')
const bcrypt= require('bcrypt')
const crypto= require('crypto')
const jwt= require('jsonwebtoken')
const secretKey = crypto.randomBytes(64).toString('hex')


class User {
  
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
        try{
            const userEmail= await pool.query(`SELECT email FROM users WHERE email=$1`, [email.toLowerCase()])
            
            if (!userEmail.rows[0]){

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
                    return newUSER.rows[0]
            }
        } catch(err){
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
            return exercise.rows
        } catch(e){
            return {error: e.message}
        }
    }    
    
    static async getSleepByEmail(email){
        try{
            
            const sleep= await pool.query(`SELECT 
            *
            FROM sleep
            WHERE email=$1`,
            [email.toLowerCase()])
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