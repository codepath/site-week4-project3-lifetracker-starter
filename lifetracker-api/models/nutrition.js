const { BadRequestError, UnauthorizedError, NotFoundError} = require("../utils/errors")
const db = require("../db")

class Nutrition {
    static async createNutrition(info){
        const requiredFields = ["name", "category", "calories", "imageUrl"]
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
            user_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, category, calories, created_at, user_id;
        `, [info.name, info.category, info.calories, info.imageUrl, 1])

        const nutrition = result.rows[0]

        return nutrition
    }

    static async fetchNutritionById(id){
        if(!id) {
            throw new BadRequestError("No id provided")
        }
        const query = `SELECT * FROM nutrition WHERE id = $1`

        const result = await db.query(query, [id])

        if(!result){
            throw new NotFoundError
        }

        const nutrition = result.rows[0]

        return nutrition
    }

    static async listNutritionForUser(userId){
        if(!userId) {
            throw new BadRequestError("No user id provided")
        }
        const query = `SELECT * FROM nutrition WHERE user_id = $1`

        const result = await db.query(query, [userId])

        if(!result){
            throw new NotFoundError
        }

        const nutrition = result.rows

        return nutrition
    }
}

module.exports = Nutrition