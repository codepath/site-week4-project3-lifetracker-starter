const { BadRequestError, UnauthorizedError, NotFoundError} = require("../utils/errors")
const db = require("../db")

class Nutrition {
    static async createNutrition({info, user}){
        const requiredFields = ["name", "category", "calories", "imageUrl", "quantity"]
        requiredFields.forEach(field => {
            if (!info.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        const result = await db.query(`INSERT INTO nutrition (
            name,
            category,
            calories,
            image_url,
            user_id,
            quantity
        )
        VALUES ($1, $2, $3, $4, (SELECT id FROM users WHERE email = $5), $6)
        RETURNING id, name, category, calories, created_at, image_url AS "imageUrl", user_id AS "userId", quantity;
        `, [info.name, info.category, info.calories, info.imageUrl, user.email, info.quantity])

        const nutrition = result.rows[0]

        return nutrition
    }

    static async fetchNutritionById(id){
        if(!id) {
            throw new BadRequestError("No id provided")
        }
        const query = `SELECT n.id,
        n.name,
        n.category,
        n.calories,
        n.image_url AS "imageUrl",
        n.user_id AS "userId",
        to_char(n.created_at, 'DD/MM/YYYY') AS "createdAt",
        n.quantity,
        u.email AS "userEmail"
        
        FROM nutrition AS n
            LEFT JOIN users AS u ON u.id = n.user_id
        WHERE n.id = $1`

        const result = await db.query(query, [id])

        const nutrition = result.rows[0]
        if(!nutrition){
            throw new NotFoundError
        }
        return nutrition
    }

    static async listNutritionForUser(user){
        if(!user) {
            throw new BadRequestError("No user provided")
        }
        const query = `SELECT n.id,
        n.name,
        n.category,
        n.calories,
        n.image_url AS "imageUrl",
        n.user_id AS "userId",
        to_char(n.created_at, 'DD/MM/YYYY') AS "createdAt",
        n.quantity,
        u.email AS "userEmail"
        
        FROM nutrition AS n
            LEFT JOIN users AS u ON u.id = n.user_id 
        WHERE u.email = $1`

        const result = await db.query(query, [user.email])

        if(!result){
            throw new NotFoundError
        }

        const nutrition = result.rows

        return nutrition
    }
}

module.exports = Nutrition