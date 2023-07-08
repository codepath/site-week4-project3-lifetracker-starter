const db = require("../db");

class Activity {
  static async getAverageCaloriesByDay(user) {
    const maxCreated = await db.query(`
    SELECT MAX(created_at) FROM nutrition WHERE user_id = $1`, [user.id])
    const getHighestDate = maxCreated.rows[0].max;
    
    const currentTime = new Date(getHighestDate)
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth()+1;
    const day = currentTime.getDate();
    
    const formattedDate = `${year}-${month.toString().padStart(2,"0")}-${day.toString().padStart(2,"0")}`;


    const result = await db.query(
      `
        SELECT AVG(calories) 
        FROM (
          SELECT calories
          FROM nutrition
          WHERE DATE(created_at) = $1::date AND user_id = $2
        ) as subquery`,
      [formattedDate, user.id]
    );

    
    const avgCalories = result.rows[0];
    if (avgCalories === null) return 0;
    return avgCalories;
  }
}

module.exports = Activity;
