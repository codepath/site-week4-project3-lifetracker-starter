const db = require("../database");

class Stats {
  //Total Exercise Minutes
  static async sumExerciseMins(id) {
    const sumExerciseMins = await db.query(
      `SELECT SUM(duration) AS total_minutes
      FROM exercise WHERE user_id = $1`,
      [id]
    );
    if (sumExerciseMins.rows[0].total_minutes === null) {
      return 0;
    } else {
      return sumExerciseMins.rows[0].total_minutes;
    }
  }

  static async avgSleepHours(id) {
    const avgSleepHours = await db.query(
      `SELECT AVG(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600) AS average_sleep_hours
      FROM sleep
      WHERE user_id = $1`,
      [id]
    );
    if (avgSleepHours.rows[0].average_sleep_hours === null) {
      return 0;
    } else {
      return avgSleepHours.rows[0].average_sleep_hours;
    }
  }

  //Total Number of Hours Slept
  static async totalNumSleep(id) {
    const totalNumSleep = await db.query(
      `SELECT SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600) AS total_sleep
      FROM sleep WHERE user_id = $1`,
      [id]
    );
    if (totalNumSleep.rows[0].total_sleep === null) {
      return 0;
    } else {
      return totalNumSleep.rows[0].total_sleep;
    }
  }

  //Average Exercise Intensity
  static async averageExerciseInt(id) {
    const averageExerciseInt = await db.query(
      `SELECT AVG(intensity) AS average_exercise_int
            FROM exercise WHERE user_id = $1`,
      [id]
    );
    if (averageExerciseInt.rows[0].average_exercise_int === null) {
      return 0;
    } else {
      return averageExerciseInt.rows[0].average_exercise_int;
    }
  }

  //Max Calories in One Meal
  static async maxCalsInOneMeal(id) {
    const maxCalsInOneMeal = await db.query(
      `SELECT calories
    FROM nutrition
    WHERE created_at = (
      SELECT MAX(created_at)
      FROM nutrition
      WHERE user_id = $1
    )`,
      [id]
    );

    if (maxCalsInOneMeal.rows.length === 0) {
      return 0;
    } else {
      return maxCalsInOneMeal.rows[0].calories;
    }
  }

  //Average Daily Calories
  static async averageDailyCalories(id) {
    const averageDailyCalories = await db.query(
      `SELECT AVG(calories) AS average_calories
      FROM (
        SELECT calories
        FROM nutrition
        WHERE created_at = (
          SELECT MAX(created_at)
          FROM nutrition
          WHERE user_id = $1
        )
      ) AS subquery;`,
      [id]
    );

    if (averageDailyCalories.rows[0].average_calories === null) {
      return 0;
    } else {
      return averageDailyCalories.rows[0].average_calories;
    }
  }
}

module.exports = Stats;
