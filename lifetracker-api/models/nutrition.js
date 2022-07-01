const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")


class Nutrition {
    static async createNutrition(nutrition) {
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
                image_url AS "imageUrl",
                user_id AS "userId";
    `,[
      nutrition.name, 
      nutrition.category, 
      nutrition.calories, 
      nutrition.imageUrl,
      123
    ]
    )

    return results.rows[0]
    }
    
    static async fetchNutritionById(id){
        if (!id) {throw new BadRequestError("No nutrition id provided")}
        const query = `SELECT * FROM nutrition WHERE id = $1`
        const result = await db.query(query, [id])
        const nutrition = result.rows[0]     
        return nutrition
    }
    
    static async listNutritions() {
        // const query = `SELECT * FROM nutrition WHERE user_id = $1`
        // const result = await db.query(query, [user.id])
        // return result
        const query = `SELECT * FROM nutrition`
        const result = await db.query(query)
        return result.rows;
    }

}

module.exports = Nutrition