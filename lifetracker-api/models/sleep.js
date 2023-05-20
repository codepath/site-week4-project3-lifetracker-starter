"use strict"

const db = require("../db")
const { NotFoundError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

class Sleep {
  static async create({ sleep, user }) {
    try {
      validateFields({ required: ["startTime", "endTime"], obj: sleep, location: "sleep create" })
    } catch (err) {
      throw err
    }

    const results = await db.query(
      `
      INSERT INTO sleep (start_time, end_time, user_id)
      VALUES ($1, $2, $3)
      RETURNING id,
                start_time AS "startTime",
                end_time AS "endTime",
                user_id AS "userId",
                timestamp
    `,
      [sleep.startTime, sleep.endTime, user.id]
    )

    return results.rows[0]
  }

  static async fetchById(sleepId) {
    const results = await db.query(
      `
      SELECT id,
              start_time AS "startTime",
              end_time AS "endTime",
              user_id AS "userId",
              timestamp
      FROM sleep
      WHERE id = $1
    `,
      [sleepId]
    )

    const sleep = results.rows[0]

    if (!sleep) {
      throw new NotFoundError("Sleep not found.")
    }

    return sleep
  }

  static async list({ user }) {
    const results = await db.query(
      `
      SELECT id,
              start_time AS "startTime",
              end_time AS "endTime",
              user_id AS "userId",
              timestamp
      FROM sleep
      WHERE user_id = $1
      ORDER BY start_time DESC
    `,
      [user.id]
    )

    const sleeps = results.rows

    return sleeps || []
  }
}

module.exports = Sleep
