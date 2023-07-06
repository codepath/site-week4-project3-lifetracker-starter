const db = require("../db");
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
                    id
                    name
                    category
                    quantity
                    calories
                    image_url
                    user_id
                    created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
  }

  // static async listNutrition() {
  //   try {
  //     const result = db.query(`
  //     SELECT * FROM nutrition WHERE `)
  //   } catch (err) {

  //   }
  // }
}
