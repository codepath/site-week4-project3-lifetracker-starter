const db = require("../db")
const { BadRequestError, UnauthorizedError} = require("../utils/errors")

class Nutrition {

    static async createNutrition({ nutrition, user }){
        const requiredFields = ["name", "category", "calories", "image_url"]
        requiredFields.forEach((field) => {
            if(!credentials.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body`)
            }
        })

        const results = await db.query(
            `
            INSERT INTO nutrition (
                name,
                category,
                calories,
                quantity,
                image_url,
                user_id
            )
            VALUES (
                $1,
                $2,
                $3::Integer,
                $4::Integer,
                $5,
                (SELECT id FROM users WHERE username = $6)
            )
            RETURNING   id,
                        name,
                        category,
                        calories,
                        quantity,
                        image_url,
                        user_id,
                        created_at
            `,
            [
                nutrition.name,
                nutrition.category,
                nutrition.calories,
                nutrition.quantity,
                nutrition.image_url,
                nutrition.created_at
            ]
        )
        return results.rows[0]
    }

    static async fetchNutritionById(nutritionId){

    }

    static async listNutritionForUser({ user }){

    }
}

module.exports = Nutrition