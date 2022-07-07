const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")


class Nutrition {
    static async createNutrition({ user, nutrition }) {
      if (!nutrition) {
          throw new BadRequestError(`No nutrition sent.`)
      }
      const requiredFields = ["name", "calories", "quantity", "imageUrl", "category"]
      requiredFields.forEach((field) => {
        if (!nutrition.hasOwnProperty(field) || !nutrition[field]) {
          throw new BadRequestError(`Required field - ${field} - missing from request body.`)
        }
      })

      // insert a new post into the database
      const results = await db.query(
        `
        INSERT INTO nutrition (
          name,
          calories,
          quantity, 
          image_url,
          category,
          user_id
          )
        VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email=$6))
        RETURNING id, 
                  name, 
                  category,
                  calories,
                  image_url AS "imageUrl",
                  user_id AS "userId";
      `,[
        nutrition.name, 
        nutrition.calories, 
        1,
        nutrition.imageUrl,
        nutrition.category,
        user.email
      ]
      )
      return results.rows[0]
    }
    
    static async fetchNutritionById(id){
        if (!id) {throw new BadRequestError("No nutrition id provided")}
        console.log(id)
        const query = `SELECT * FROM nutrition WHERE id = $1`
        const result = await db.query(query, [id])
        console.log(result.rows)
        const nutrition = result.rows[0]   

        if(!nutrition){
          throw new NotFoundError("Nutrition not found")
        }

        return nutrition
    }
    
    static async listNutritions() {
        // const query = `SELECT * FROM nutrition WHERE user_id = $1`
        // const result = await db.query(query, [user.id])
        // return result


        const result = await db.query(
          `SELECT * FROM nutrition
          LEFT  JOIN users ON user.id = nutrition.user_id
          WHERE users.email=$1
          `,[
            user.email
          ])

        return result.rows;
    }
}

module.exports = Nutrition