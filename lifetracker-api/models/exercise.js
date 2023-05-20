"use strict"

const db = require("../db")
const { NotFoundError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

class Exercise {
  static async create({ exercise, user }) {
    const { name, duration, intensity } = exercise
    try {
      validateFields({ required: ["name", "duration", "intensity"], obj: exercise, location: "exercise create" })
    } catch (err) {
      throw err
    }

    const results = await db.query(
      `
      INSERT INTO exercises (name, duration, intensity, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id,
                name,
                duration,
                intensity,
                user_id AS "userId",
                timestamp
    `,
      [name, duration, intensity, user.id]
    )

    return results.rows[0]
  }

  static async fetchById(exerciseId) {
    const results = await db.query(
      `
      SELECT id,
              name,
              duration,
              intensity,
              user_id AS "userId",
              timestamp
      FROM exercises
      WHERE id = $1
    `,
      [exerciseId]
    )

    const exercise = results.rows[0]

    if (!exercise) {
      throw new NotFoundError("Exercise not found.")
    }

    return exercise
  }

  static async list({ user }) {
    const results = await db.query(
      `
      SELECT id,
              name,
              duration,
              intensity,
              user_id AS "userId",
              timestamp
      FROM exercises
      WHERE user_id = $1
      ORDER BY timestamp DESC
    `,
      [user.id]
    )

    const exercises = results.rows

    return exercises || []
  }
}

module.exports = Exercise
