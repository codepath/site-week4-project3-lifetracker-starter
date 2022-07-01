const db = require('../db')
const {BadRequestError, NotFoundError} = require('../utils/errors')

class Nutrition
{
    static async createNutrition({user, nutrition})
    {
        //Create a new nutrition instance in the database
        const requiredFields = ["name", "category", "calories", "imageUrl", "quantity"]
        requiredFields.forEach((field) => {
            if(!nutrition.hasOwnProperty(field))
            {
                throw new BadRequestError(`Required field ${field} missing from request body`)
            }
        })

        const results = await db.query(
            `
                INSERT INTO nutrition (name, category, calories, image_url, quantity, user_id)
                VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))
                RETURNING id, name, category, calories, image_url, quantity, user_id, created_at
            `, [nutrition.name, nutrition.category, nutrition.calories, nutrition.imageUrl, nutrition.quantity, user.email]
        )

        return results.rows[0]
    }



    static async fetchNutritionById(nutritionId)
    {
        //Fetch a single nutrition instance
        const results = await db.query(
            `
                SELECT nutrition.id,
                       nutrition.name,
                       nutrition.category,
                       nutrition.calories,
                       nutrition.image_url,
                       nutrition.quantity
                FROM nutrition
                WHERE nutrition.id = $1
            `, [nutritionId]
        )
        const nutrition= results.rows[0]
        if(!nutrition)
        {
            throw new NotFoundError()
        }

        return nutrition
    }



    static async listNutritionForUser()
    {
        //list all nutrition instances 
        const results = await db.query(
            `
                SELECT nutrition.id,
                       nutrition.name,
                       nutrition.category,
                       nutrition.calories,
                       nutrition.image_url,
                       nutrition.quantity
                FROM nutrition
                ORDER BY nutrition.created_at DESC
            `
        )
        return results.rows
    }
}

module.exports = Nutrition