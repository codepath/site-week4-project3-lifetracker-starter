const db = require("../db")
const { BadRequestError, UnauthorizedError, NotFoundError} = require("../utils/errors")

class Nutrition {

    static async createNutrition({ nutrition, user }){

        const requiredFields = ["name", "category", "calories", "image_url"]
        requiredFields.forEach((field) => {
            if(!nutrition.hasOwnProperty(field)){
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
                (SELECT id FROM users WHERE email = $6)
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
                user.email
            ]
        )
        return results.rows[0]
    }

    static async fetchNutritionById(nutritionId){

        const results = await db.query(
            `
            SELECT  n.id,
                    n.name,
                    n.category,
                    n.calories,
                    n.quantity,
                    n.image_url,
                    n.user_id,
                    u.email,
                    n.created_at
            FROM nutrition AS n
                JOIN users AS u ON u.id = n.user_id
            WHERE n.id = $1
            `, [nutritionId]
        )

        const nutrition = results.rows[0]

        if(!nutrition){
            throw new NotFoundError()
        }

        return nutrition
    }

    static async listNutritionForUser({ user }){

        const results = await db.query(
            `
            SELECT  n.id,
                    n.name,
                    n.category,
                    n.calories,
                    n.quantity,
                    n.image_url,
                    n.user_id,
                    u.email,
                    n.created_at
            FROM nutrition AS n
                JOIN users AS u ON u.id = n.user_id
            WHERE n.user_id = (SELECT id FROM users WHERE email = $1)
            ORDER BY n.created_at DESC
            `, [user.email]
        )
        
        return results.rows
    }
}

module.exports = Nutrition