"use strict"

const db = require("../db")
const { NotFoundError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

class Nutrition {
  static async create({ nutrition, user }) {
    const { name, category, quantity, calories, imageUrl } = nutrition
    try {
      validateFields({ required: ["name", "category"], obj: nutrition, location: "nutrition create" })
    } catch (err) {
      throw err
    }

    const results = await db.query(
      `
    INSERT INTO nutrition (name, category, quantity, calories, image_url, user_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id,
              name,
              category,
              quantity,
              calories,
              image_url as "imageUrl",
              user_id AS "userId",
              timestamp
    `,
      [name, category, quantity || 1, calories, imageUrl, user.id]
    )

    return results.rows[0]
  }

  static async fetchById(nutritionId) {
    const results = await db.query(
      `
    SELECT id,
              name,
              category,
              quantity,
              calories,
              image_url as "imageUrl",
              user_id AS "userId",
              timestamp
    FROM nutrition
    WHERE id = $1
    `,
      [nutritionId]
    )

    const nutrition = results.rows[0]

    if (!nutrition) {
      throw new NotFoundError("Nutrition not found.")
    }

    return nutrition
  }

  static async list({ user }) {
    const results = await db.query(
      `
      SELECT id,
            name,
            category,
            quantity,
            calories,
            image_url AS "imageUrl",
            user_id AS "userId",
            timestamp
      FROM nutrition
      WHERE user_id = $1
      ORDER BY timestamp DESC
    `,
      [user.id]
    )

    const nutrition = results.rows

    return nutrition || []
  }
}

module.exports = Nutrition
