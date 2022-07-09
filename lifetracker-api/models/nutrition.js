const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")


class Nutrition {
    static async createNutrition({user, nutrition}) {
      console.log("User in create nutrition model: ", user)
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
      console.log("Fetch model nutrition user: ", user)

        if (!id) {throw new BadRequestError("No nutrition id provided")}
        const query = `SELECT * FROM nutrition WHERE id = $1`
        const result = await db.query(query, [id])
        const nutrition = result.rows[0]   

        if(!nutrition){
          throw new NotFoundError("Nutrition not found")
        }

        return nutrition
    }
    
    static async listNutritions({ user }) {
      console.log("Fetch model nutrition user: ", user)

      const result = await db.query(
        `
        SELECT  n.id, 
                n.name,
                n.category, 
                n.quantity, 
                n.calories,
                n.user_id AS "userId",
                n.image_url AS "imageUrl",
                n.created_at AS "createdAt" 
          FROM nutrition AS n
                JOIN users AS u ON u.id = n.user_id
          WHERE n.user_id = (SELECT users.id FROM users WHERE email = $1);
          `, [user.email]
      )  
        return result.rows;
    }
}

module.exports = Nutrition