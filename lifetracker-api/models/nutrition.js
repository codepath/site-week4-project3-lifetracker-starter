const db = require("../db");
const { NotFoundError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class Nutrition {
  static async createNutrition(nutrition) {
    const {
      id,
      name,
      category,
      quantity,
      calories,
      image_url,
      user_id,
      created_at,
    } = nutrition;

    const requiredNutrition = [
      "name",
      "category",
      "quantity",
      "calories",
      "user_id",
    ];

    try {
      validateFields({
        required: requiredNutrition,
        obj: nutrition,
        location: "nutrition",
      });
    } catch (err) {
      throw err;
    }

    const result = await db.query(
      `INSERT INTO nutrition (
                    id,
                    name,
                    category,
                    quantity,
                    calories,
                    image_url,
                    user_id,
                    created_at
                    ) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    RETURNING id, 
                              name, 
                              category, 
                              quantity, 
                              calories, 
                              image_url, 
                              user_id, 
                              created_at
                          `,
      [id, name, category, quantity, calories, image_url, user_id, created_at]
    );
    const newNutrition = result.rows[0]
    return newNutrition;
  }

  static async listNutrition(user_id) {
    try {
      const result = await db.query(`
      SELECT * FROM nutrition WHERE user_id = $1`, [user_id]);

      const nutrition = result.rows;
      if (!nutrition || nutrition.length === 0) {
        throw new NotFoundError("No nutrition logged from this user")
      }
      return nutrition
    } catch (err) {
      return err;
    }
  }
}

module.exports = Nutrition;
