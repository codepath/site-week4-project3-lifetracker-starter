const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Nutrition {

    static async createNutrition({nutrition, user}) {
        const requiredFields = ["name","category","calories","imageUrl"] // need to add quantity and default to 1
        requiredFields.forEach(field => {
            if (!nutrition.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        })

        const results = await db.query(
            `
            INSERT INTO nutrition (name, category, calories, image_url, user_id)
            VALUES ($1, $2, $3, $4, (SELECT id FROM users WHERE email = $5))
            RETURNING   id,
                        name,
                        category,
                        calories,
                        image_url AS "imageUrl",
                        user_id AS "userId",
                        created_at AS "createdAt"                     
            `, [nutrition.name, nutrition.category, nutrition.calories, nutrition.imageUrl, user.email]
        )

        return results.rows[0]
    }

    static async fetchNutritionById(nutritionId) {
        const results = await db.query(
            `
            SELECT  n.id,
                    n.name,
                    n.category,
                    n.calories,
                    n.image_url AS "imageUrl",
                    n.user_id AS "userId",
                    u.email AS "userEmail",
                    n.created_at AS "createdAt"
            FROM nutrition AS n
                JOIN users AS u ON u.id = n.user_id
            WHERE n.id = $1
            `, [nutritionId]
        )
        const nutrition = results.rows[0]

        if(!nutrition) {
            throw new NotFoundError()
        }
        return nutrition
    }

    static async listNutritionById() {
        const results = await db.query(
            `
            SELECT  n.id,
                    n.name,
                    n.category,
                    n.calories,
                    n.image_url AS "imageUrl",
                    n.user_id AS "userId",
                    u.email AS "userEmail",
                    n.created_at AS "createdAt"
            FROM nutrition AS n
                JOIN users AS u ON u.id = n.user_id
            ORDER BY n.id DESC
            `
        )
        return results.rows
    }

    static async editNutrition({ nutritionId, nutritionUpdate }) {
        const requiredFields = ["calories"] // need to add quantity and default to 1
        requiredFields.forEach(field => {
            if (!nutritionUpdate.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        })

        const results = await db.query(
            `
            UPDATE nutrition
            SET calories = $1,
                updated_at = NOW()
            WHERE id = $2
            RETURNING   id,
                        name,
                        category,
                        calories,
                        image_url AS "imageUrl",
                        user_id AS "userId",
                        created_at AS "createdAt" 
            `,[nutritionUpdate.calories,nutritionId]
        )
        return results.rows[0]
    }
}



module.exports = Nutrition