const pool = require('./database.js');
const bcrypt = require('bcrypt');
const { BadRequestError, UnauthorizedError } = require("./utils/errors.js");

class User {
    static _createPublicUser(user) {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          location: user.location,
          date: user.date,
        }
      }
    static async register(input) {
        const {email, firstname, lastname, username, password} = input
        const hashedPassword = await bcrypt.hash(password, 13);
        const newUSER = await pool.query(`INSERT INTO
        users (
        email,
        firstname,
        lastname,
        username,
        password    
        )
        VALUES(
            $1,
            $2,
            $3,
            $4,
            $5
        )
        RETURNING firstname`, [email, firstname, lastname, username, hashedPassword])
        return newUSER.rows[0]
    }
    static async login(creds) {
        const { email, password } = creds
        // const requiredCreds = ["email", "password"]
        // try {
        //   validateFields({ required: requiredCreds, obj: creds, location: "user authentication" })
        // } catch (err) {
        //   throw err
        // }
    
        const user = await User.fetchUserByEmail(email)
        const sleep = await User.allsleep(user.id)
        if (user) {
          // compare hashed password to a new hash from password
          const isValid = await bcrypt.compare(password, user.password)
          if (isValid === true) {
            const userInfo = User._createPublicUser(user)
            return {sleep, userInfo}
          }
        }
    
        throw new UnauthorizedError("Invalid username/password")
      }
      static async fetchUserByEmail(email) {
        const result = await pool.query(
          `SELECT id,
                  email, 
                  password,
                  firstname,
                  lastname              
               FROM users
               WHERE email = $1`,
          [email.toLowerCase()]
        )
    
        const user = result.rows[0]
    
        return user
      }

      static async sleep(input) {
        const {start_time, end_time, id} = input
        console.log(start_time,end_time)
        const sleep = await pool.query(`INSERT INTO
        sleep (
        start_time,
        end_time,
        user_id

        )
        VALUES(
            $1,
            $2,
            $3
        )
        RETURNING start_time, end_time, created_at`, [start_time, end_time, id])
        return sleep.rows[0]
    }
    static async allsleep(id){
        const sleep = await pool.query(
            `SELECT start_time, end_time, created_at
            FROM sleep
            WHERE user_id = $1
            ORDER BY created_at DESC`,
            [id]
        );
        const allSleep = sleep.rows
        return allSleep
    }
    static async sleepstats(idInfo){
        const {id}=idInfo
      const avgSleepHours = await pool.query(
        `SELECT AVG(EXTRACT(EPOCH FROM(end_time - start_time)) / 3600) AS average_sleep_hours
        FROM sleep
        WHERE user_id = $1`,
        [id]
    ); 
    let avgSleep;
    if (avgSleepHours.rows[0].average_sleep_hours === null) {
        avgSleep= 0;
    } else {
        avgSleep= avgSleepHours.rows[0].average_sleep_hours
    }
    const totalNumSleep = await pool.query(
        `SELECT SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600) AS total_sleep
        FROM sleep WHERE user_id = $1`,
        [id]
      );
      let totSleep;
      if (totalNumSleep.rows[0].total_sleep === null) {
        totSleep = 0;
      } else {
        totSleep = totalNumSleep.rows[0].total_sleep;
      }
      return{avgSleep:avgSleep, totSleep:totSleep}
    }
}  

module.exports = User

