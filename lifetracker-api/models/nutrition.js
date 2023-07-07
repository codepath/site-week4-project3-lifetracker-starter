const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class Nutrition {
  static async createNutrition({nutrition, user}) {
    const {
      name,
      category,
      quantity,
      calories,
      image_url,
      user_id,
      created_at,
    } = nutrition;

    const requiredNutrition = ["name", "category", "calories", "quantity"];

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
                    name,
                    category,
                    quantity,
                    calories,
                    image_url,
                    user_id
                    ) 
        VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))
        RETURNING id, 
                  name, 
                  category, 
                  quantity, 
                  calories, 
                  image_url as "imageUrl", 
                  user_id as "userId", 
                  created_at as "createdAt"
                          `,
      [nutrition.name, nutrition.category, nutrition.quantity, nutrition.calories, nutrition.imageUrl, user.email]
    );
    const newNutrition = result.rows[0];
    return newNutrition;
  }

  static async listNutrition(user_id) {
    try {
      const result = await db.query(
        `
      SELECT * FROM nutrition WHERE user_id = $1`,
        [user_id]
      );

      const nutrition = result.rows;
      if (!nutrition || nutrition.length === 0) {
        throw new NotFoundError("No nutrition logged from this user");
      }
      return nutrition;
    } catch (err) {
      return err;
    }
  }
}

module.exports = Nutrition;
