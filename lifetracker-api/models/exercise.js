const db = require("../db");
const User = require("../models/user")
const { BadRequestError,NotFoundError} = require("../utils/erros");

class Exercise {
    static async listAllExercise(info){
      
        const query = `SELECT * FROM newexcercise AS e
        JOIN userslt AS u ON u.email = e.user_email
        ORDER BY e.date DESC`
        const results = await db.query(query)

        return results.rows
    }

    static async fetchExerciseById(exerciseId){

    }
  

    static async createNewExercise({exercise}){
        //create new exercise
        const requiresFields = ["user_email","title","duration", "intensity"]
        requiresFields.forEach(field =>{
            if(!exercise.hasOwnProperty(field)){
                throw new BadRequestError(`Required field - ${field} - missing from request body`)
            }
        }) 

        const lowercasedEmail = exercise.user_email.toLowerCase();
        const query = `
    INSERT INTO newexcercise (user_email, title, duration, intensity)
    VALUES ($1, $2, $3, $4)
  `;
    const results = await db.query(query, [
        lowercasedEmail,
        exercise.title,
        exercise.duration,
        exercise.intensity
  ]);
       
        return results.rows[0]
    }

        

    static async editExercise({exerciseId, exerciseUpdate}){
        //edit exercise
    }

    static async addExercise(exerciseInfo) {
        const { exercise_name, duration, intensity, user_email } = exerciseInfo
      const result = await db.query(
        `INSERT INTO exercise (name, duration, intensity, user_email)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [exercise_name, duration, intensity, user_email]
      );
  
      const exercise = result.rows[0];
  
      return exercise;
    }

    static async listExercisesByUserEmail(user_email) {
        // console.log(user_email)
        const result = await db.query(
          `SELECT * FROM newExcercise WHERE user_email = $1`,
          [user_email]
        );

        // console.log(`SELECT * FROM newExcercise WHERE user_email = $1`,
        //   [user_email])
        const exercises = result.rows[0];
        // console.log(exercises)
      
        return exercises;
    }

    static async getTotalDuration(email) {
        const lowercasedEmail = email
        const query = `
          SELECT SUM(duration::numeric) AS total_duration
          FROM newExcercise
          WHERE user_email = $1;
        `;
        const result = await db.query(query, [lowercasedEmail]);
        // console.log("total duration", result.rows[0].total_duration);
      
        return result.rows[0].total_duration;
      }
      
      
      
      
}
module.exports = Exercise