const db = require('../db')
const {BadRequestError, NotFoundError} = require('../utils/errors')

class Nutrition {
    static async listNutritionForUser({user}) {
        //list all posts in db in descerndig order of when they are created
        const results = await db.query(
            `
                SELECT n.id,
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
        return results.rows

    }

    static async createNutrition({nutrition, user}) {
        //create single post
        const requiredFields = ['name', 'category', 'quantity', 'calories', 'imageUrl'];
        requiredFields.forEach(field => {
            if(!nutrition.hasOwnProperty(field)) {
                throw new BadRequestError(`Required field- ${field} - missing from request body.`)
            }
        })
        const results = await db.query(
            `
                INSERT INTO nutrition (name, category, quantity, calories, image_url, user_id)
                VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))
                RETURNING id,
                          name,
                          category,
                          quantity,
                          calories,
                          user_id AS "userId",
                          image_url AS "imageUrl",
                          created_at AS "createdAt";
            `, [nutrition.name, nutrition.category, nutrition.quantity, nutrition.calories, nutrition.imageUrl, user.email]
        )
        return results.rows[0]

    }

    static async fetchNutritionById(postId) {
        //fetch single post
    }
}

module.exports = Nutrition;