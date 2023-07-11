"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/erros")
const { validateFields } = require("../utils/validate")
//const crypto = require('crypto')
const jwt = require('jsonwebtoken')
//const secretKey = crypto.randomBytes(64).toString('hex')
const {SECRET_KEY} = require("../config")


const { BCRYPT_WORK_FACTOR } = require("../config")

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      date: user.date,
    }
  }

  /**
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns user
   **/

  static async authenticate(creds) {
    const { email, password } = creds
    const requiredCreds = ["email", "password"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user authentication" })
    } catch (err) {
      throw err
    }

    const user = await User.fetchUserByEmail(email)

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid === true) {
        return User._createPublicUser(user)
      }
    }

    throw new UnauthorizedError("Invalid username/password")
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    const { email, password, firstName, lastName, location, date } = creds
    const requiredCreds = ["email", "password", "firstName", "lastName", "date"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user registration" })
    } catch (err) {
      throw err
    }

    const existingUserWithEmail = await User.fetchUserByEmail(email)
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`)
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()

    const result = await db.query(
      `INSERT INTO usersLT (
          password,
          first_name,
          last_name,
          email,
          date
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id,
                  email,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  date
                  `,
      [hashedPassword, firstName, lastName, normalizedEmail, date]
    )

    const user = result.rows[0]

    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
              email, 
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              date              
           FROM usersLT
           WHERE email = $1`,
      [email.toLowerCase()]
    )

    const user = result.rows[0]

    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id,
              email,    
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              date              
           FROM usersLT
           WHERE id = $1`,
      [userId]
    )

    const user = result.rows[0]

    return user
  }

  //Generate authorization token
  static generateAuthToken(user) {
    const payload = {
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      emailaddress: user.email,
      username: user.userName
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })
    return token
  }
  //Verify Authorization Token
  static verifyAuthToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY)
      return decoded
    } catch (err) {
      return null
    }
  }

    //login function
    static async login(creds) {
      const { email, password } = creds
      const user = await User.fetchUserByEmail(email)
      if (user) {
        // compare hashed password to a new hash from password
        const isValid = await bcrypt.compare(password, user.password)
        if (isValid === true) {
          return User._createPublicUser(user)
        }
      }
      return { error: "Invalid username/password" }
    }


    static async addEx(credentials) {
      const requiredFields = ["user_email", "title", "duration", "intensity"];
      requiredFields.forEach((field) => {
        if (!credentials.hasOwnProperty(field)) {
          throw new BadRequestError(`Missing ${field} in request body.`);
        }
      });
    
      const existingUser = await User.fetchUserByEmail(credentials.user_email);
      
      const lowercasedEmail = credentials.user_email.toLowerCase();
    
      const query = `
        INSERT INTO Excercise (user_email, title, duration, intensity)
        VALUES ($1, $2, $3, $4)
      `;
      const result = await db.query(query, [
        lowercasedEmail,
        credentials.title,
        credentials.duration,
        credentials.intensity
      ]);
      return;
    
    }


// //Function to add a workout to the workout database
// static async addWorkout(info) {
//   const { name, category, duration, intensity, email } = info
//   const user = await User.fetchUserByEmail(email)
//   const { userid } = user
//   //we want to add to the workout database
//   const result = await db.query(
//     `INSERT INTO workouts (
//             name,
//             category,
//             duration,
//             intensity,
//             userID
//         )
//         VALUES($1, $2, $3, $4, $5)
//         RETURNING name,            
//                   category, 
//                   duration,
//                   intensity,
//                   userID
//                   `,
//     [name, category, duration, intensity, userid]
//   )
//   //get all the workouts for a specific user
//   const all = await User.fetchAllWorkouts(userid)
//   return all
// }


// let avgSleep;
// if (avgSleepHours.rows[0].average_sleep_hours === null) {
//   avgSleep= 0;
// } else {
//   avgSleep= avgSleepHours.rows[0].average_sleep_hours
// }
// const totalNumSleep = await pool.query(
//   `SELECT SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600) AS total_sleep
//   FROM sleep WHERE user_id = $1`,
//   [id]
// );
// let totSleep;
// if (totalNumSleep.rows[0].total_sleep === null) {
//   totSleep = 0;
// } else {
//   totSleep = totalNumSleep.rows[0].total_sleep;
// }
// return{avgSleep:avgSleep, totSleep:totSleep}
// }





}

module.exports = User
