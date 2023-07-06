const db = require("../db");
const {validateFields} = require("../utils/validate")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const {BCRYPT_WORK_FACTOR}=require("../config")

class Sleep {

static async sleepCreate(sleepData) {
      // Define the required fields for sleep data
  const requiredFields = ["startTime", "endTime"];
  
  // Check if all required fields are present in the sleepData object
  for (const field of requiredFields) {
    if (!sleepData.hasOwnProperty(field)) {
      throw new BadRequestError(`Missing ${field} in sleep data`);
    }

  }
    const result =  await db.query(`
       INSERT INTO sleep(
        startTime,
        endTime)
        VALUES($1, $2)
        RETURNING id, startTime, endTime
       `, [sleepData.startTime, sleepData.endTime])
        const userSleep = result.rows[0]; 
        return userSleep; 


}
}
module.exports= Sleep