const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class Sleep {
  static async logSleep({ sleep, user }) {
    const { sleep_time, end_time } = sleep;
    const requiredSleep = ["start_time", "end_time"];
    try {
      validateFields({
        required: requiredSleep,
        obj: sleep,
        location: "sleep",
      });
    } catch (err) {
      throw err;
    }

    const result = await db.query(
      `INSERT INTO sleep (
                        start_time,
                        end_time,
                        user_id
                        ) 
            VALUES ($1, $2, (SELECT id FROM users WHERE email = $3))
            RETURNING id, 
                      start_time, 
                      end_time, 
                      user_id, 
                      created_at
                              `,
      [sleep.start_time, sleep.end_time, user.email]
    );
    const newSleep = result.rows[0];
    return newSleep;
  }
}

module.exports = Sleep;
