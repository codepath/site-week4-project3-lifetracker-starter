const { BadRequestError, UnauthorizedError, NotFoundError} = require("../utils/errors")
const db = require("../db")

class Activity {
    static async calculateDailyCaloriesSummaryStats (user) {
        if(!user) {
            throw new BadRequestError("No user provided")
        }

        const query = `
            SELECT to_char(n.created_at, 'DD/MM/YYYY') AS date,
            SUM(n.calories) AS "totalCaloriesPerDay"
            FROM nutrition AS n
                LEFT JOIN users AS u ON u.id = n.user_id 
            WHERE u.email = $1
            GROUP BY date;
        `

        const result = await db.query(query, [user.email])

        if(!result){
            throw new NotFoundError
        }

        const activity = result.rows

        return activity
    }

    static async calculatePerCategoryCaloriesSummaryStats (user) {
        if(!user) {
            throw new BadRequestError("No user provided")
        }

        const query = `
            SELECT n.category,
            CAST(AVG(n.calories) AS DECIMAL(10,1)) AS "avgCaloriesPerCategory"
            FROM nutrition AS n
                LEFT JOIN users AS u ON u.id = n.user_id 
            WHERE u.email = $1
            GROUP BY n.category;
        `

        const result = await db.query(query, [user.email])

        if(!result){
            throw new NotFoundError
        }

        const activity = result.rows

        return activity
    }

    static async calculateAggCalories (user){
        if(!user) {
            throw new BadRequestError("No user provided")
        }

        const query = `
            SELECT CAST(AVG(n.sum_calories) AS DECIMAL(10,1)) AS "avgCalories",
            MAX(n.sum_calories) AS "maxCalories",
            SUM(n.sum_calories) AS "sumCalories"
            FROM (
                SELECT to_char(created_at, 'DD/MM/YYYY') AS date, SUM(calories) as sum_calories, user_id
                FROM nutrition 
                GROUP BY date, user_id
            ) AS n
                LEFT JOIN users AS u ON u.id = n.user_id 
            WHERE u.email = $1;
        `

        const result = await db.query(query, [user.email])

        if(!result){
            throw new NotFoundError
        }

        const activity = result.rows[0]

        return activity
    }

}

module.exports = Activity
