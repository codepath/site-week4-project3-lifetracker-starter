const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

class Nutrition {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {Nutrition} nutrition - nutrition item from database
   * @returns nutrition item
   */


  /**
   * Register nutrition with data.
   *
   *
   *
   * @returns nutrition activity
   **/

  static async register(formData) {
    const {name, category, calories, image, userId} = formData
    const requiredData = ["name", "category", "calories", "image", "userId"]
    try {
      validateFields({ required: requiredData, obj: formData, location: "user registration" })
    } catch (err) {
      throw err
    }
    const result = await db.query(
      `INSERT INTO nutrition (
        name,
        category, 
        calories, 
        image_url,
        user_id
          
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id,
                  name,            
                  category,
                  calories,
                  image_url AS image,
                  user_id AS userId
                  `,
      [name, category, calories, image, userId]
    )

    const nutrition = result.rows[0]

    return nutrition
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns nutrition
   */
  static async getAllNutrition(userId) {
    const result = await db.query(
      `SELECT id,
              name,
              category,
              calories,
              image_url AS "image"           
           FROM nutrition
           WHERE user_id = $1`,
      [userId]
    )
    

    const nutrition = result.rows

    return nutrition
  }
  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns nutrition
   */
  static async getAverageDailyCalories(userId) {
    const result = await db.query(
      `SELECT 
          AVG(CAST(calories AS FLOAT)) AS average
      FROM nutrition
      WHERE user_id = $1
      ;`,
      [userId]
    )
    

    const nutrition = result.rows[0]

    return nutrition
  }
}

module.exports = Nutrition