"use strict"

const db = require("../db")

class Activity {
  static async getTotalExerciseMinutes({ user }) {
    const results = await db.query(
      `
    SELECT SUM(duration)
    FROM exercises
    WHERE user_id = $1
    `,
      [user.id]
    )

    return results.rows[0]
  }

  static async averageExerciseIntensity({ user }) {
    const results = await db.query(
      `
    SELECT AVG(intensity)
    FROM exercises
    WHERE user_id = $1
    `,
      [user.id]
    )

    return results.rows[0]
  }

  static async averageHoursOfSleep({ user }) {
    const results = await db.query(
      `
    SELECT AVG(AGE(end_time, start_time))
    FROM sleep
    WHERE user_id = $1
    `,
      [user.id]
    )

    return results.rows[0]
  }

  static async getTotalHoursSlept({ user }) {
    const results = await db.query(
      `
    SELECT SUM(AGE(end_time, start_time))
    FROM sleep
    WHERE user_id = $1
    `,
      [user.id]
    )

    return results.rows[0]
  }

  static async getCaloriesSummaryStats({ user }) {
    const results = await db.query(
      `
    SELECT AVG(calories) AS "avgCalories", MAX(calories) AS "maxCalories", timestamp::date as ts
    FROM nutrition
    WHERE user_id = $1
    GROUP BY timestamp::date
    ORDER BY timestamp::date DESC
    `,
      [user.id]
    )

    return results.rows
  }
}

module.exports = Activity
