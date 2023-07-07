const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class Nutrition {
  static async createNutrition({ nutrition, user }) {
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
      [
        nutrition.name,
        nutrition.category,
        nutrition.quantity,
        nutrition.calories,
        nutrition.imageUrl,
        user.email,
      ]
    );
    const newNutrition = result.rows[0];
    return newNutrition;
  }

  static async listNutrition() {
    try {
      const result = await db.query(
        `SELECT n.id,
                n.name,
                n.category,
                n.quantity,
                n.calories,
                n.user_id,
                n.image_url
         FROM nutrition AS n
            JOIN users AS u ON u.id = n.user_id
          ORDER BY n.created_at DESC`
      );

      const nutritionList = result.rows;
      return nutritionList;
    } catch (err) {
      return err;
    }
  }

  static async fetchNutritionById(nutritionId) {
    const results = db.query(
      `
      SELECT n..id,
             n.name,
             n.category,
             n.quantity,
             n.calories,
             n.user_id,
             n.image_url
      FROM nutrition AS n
        JOIN users as u on u.id = n.user_id
      WHERE n.id = $1
    `, [nutritionId]
    );

    const nutrition = results.rows[0];
    if (!nutrition) {
      throw new NotFoundError();
    }
    return nutrition;
  }
}

module.exports = Nutrition;
