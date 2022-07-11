const { BadRequestError, NotFoundError} = require("../utils/errors")
const db = require("../db")

class Activity {
    static async calculateDailyCaloriesSummaryStats (user) {
        if(!user) {
            throw new BadRequestError("No user provided")
        }

        const query = `
            SELECT  to_char(nutrition.created_at, 'MM/DD/YYYY') AS date,
                    SUM(nutrition.calories) AS "totalCaloriesPerDay"
            FROM nutrition
                    LEFT JOIN users ON users.id = nutrition.user_id 
            WHERE users.email = $1
            GROUP BY date;
        `

        const result = await db.query(query, [user.email])

        if(!result){
            throw new NotFoundError
        }

        const activity = result.rows
        
        console.log("CDCSS: ", activity)
        return activity
    }

    static async calculatePerCategoryCaloriesSummaryStats (user) {
        if(!user) {
            throw new BadRequestError("No user provided")
        }

        const query = `
            SELECT  n.category,
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
        console.log("CPCCSS: ", activity)
        return activity
    }
}

module.exports = Activity