const db = require("../db");
const {validateFields} = require("../utils/validate")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const {BCRYPT_WORK_FACTOR}=require("../config")

class Sleep {

static async sleepCreate(sleepData) {
      // Define the required fields for sleep data
  const requiredFields = ["startTime", "endTime", "user_id"];
  
  // Check if all required fields are present in the sleepData object
  for (const field of requiredFields) {
    if (!sleepData.hasOwnProperty(field)) {
      throw new BadRequestError(`Missing ${field} in sleep data`);
    }

  }
    const result =  await db.query(`
       INSERT INTO sleep(
        startTime,
        endTime,
        user_id)
        VALUES($1, $2, $3)
        RETURNING id, startTime, endTime, user_id
       `, [sleepData.startTime, sleepData.endTime, sleepData.user_id])
        const userSleep = result.rows[0]; 
        return userSleep; 
}

// static async getAverageHoursSlept (req, res)  {
//   try {
//     const queryResult = await db.query('SELECT AVG(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600) AS avg_hours_slept FROM sleep');
//     const { avg_hours_slept } = queryResult.rows[0];
//     res.json({ avgHoursSlept: avg_hours_slept });
//   } catch (error) {
//     // Handle any errors that occur during the database query
//     res.status(500).json({ error: 'An error occurred while retrieving the average hours slept.' });
//   }
// };
}
module.exports= Sleep