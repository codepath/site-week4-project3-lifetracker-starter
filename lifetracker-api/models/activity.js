const { bcrypt_factor } = require("../config")
const bcrypt = require("bcrypt")
const db = require("../db")
const { BadRequestError, UnauthorizedError} = require("./utils/erros")

class Activity {
    static async sumMinsOfExerciseForUser ({user}){
        const query = "SELECT SUM(duration) FROM newexcercise WHERE user.email = $1"
        const results = await db.query (query, [user.email])
        return results.rows
    }


    static async getTotalDuration(email) {
    const lowercasedEmail = 'happy@gmail.com'
    const query = `
      SELECT SUM(duration::numeric) AS total_duration
      FROM newExcercise
      WHERE user_email = $1;
    `;
    const result = await db.query(query, [lowercasedEmail]);
    console.log("total duration", result.rows[0].total_duration);
  
    return result.rows[0].total_duration;
  }
  
}
module.exports = Activity