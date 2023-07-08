const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Exercise{
static async listExercises(){
    //list all exercises 



}
// this function is used for creating a new exercise and uploading it to the database when called

static async createNewExercise({exercise}){
    const requiredFields=["exerciseName","exerciseCategory","exerciseDuration" , "exerciseIntensity", "userId"]
    requiredFields.forEach(field =>{
        if(!exercise.hasOwnProperty(field)){
            throw new BadRequestError(`Missing ${field} in request body`)
        }
    })
    const results=await db.query(
        `INSERT INTO exercise(exercise_name, category, duration, intensity, userId)
        VALUES($1, $2, $3, $4, $5)
        RETURNING id,exercise_name, category, duration, intensity, userId, recorded_at 
        ` , [exercise.exerciseName, exercise.exerciseCategory, exercise.exerciseDuration, exercise.exerciseIntensity, exercise.userId]
    )
 
}
//this function is used for fetching all the exercises  by id
static async fetchExercisebyId({userIdReq}){
    console.log(userIdReq)
    const result =await db.query(
        `SELECT exercise_name , category, duration, intensity
        FROM exercise 
        WHERE userId=$1`, [userIdReq]
    );
    const exerciseData=result.rows;
    console.log(exerciseData)
    
    return exerciseData;








}


}

module.exports=Exercise