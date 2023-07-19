"use strict"
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Nutrition {
    // ...
  
    /**
     * Add a new exercise to the database for a specific user.
     *
     * @param {string} name - Exercise name
     * @param {string} category - Exercise category
     * @param {number} time - Exercise time in minutes
     * @param {string} intensity - Exercise intensity
     * @param {number} user_id - ID of the user associated with the exercise
     * @returns {object} - The inserted exercise object
     */
    static async addNutrition(nutritionInfo) {
        
        const { name, category, quantity, calories, user_id } = nutritionInfo
      const result = await db.query(
        `INSERT INTO nutrition (name, category, quantity, calories, user_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, category, quantity, calories, user_id]
      );
  
      const nutrition = result.rows[0];
  
      return nutrition;
    }

    static async getNutritionByUserId(user_id) {
        const result = await db.query(
          `SELECT * FROM nutrition WHERE user_id = $1`,
          [user_id]
        );
      
        const nutritions = result.rows;
      
        return nutritions;
    }

    static async getCaloriesByUserId(user_id){

        const result = await db.query(
        `SELECT SUM(calories) FROM nutrition WHERE user_id = $1`,
        [user_id]
        );

        const nutritionCalories = result.rows[0].sum;
        return nutritionCalories;
    }

    static async getMaxCaloriesByUserId(user_id){
        const result = await db.query(

        `SELECT MAX(calories) FROM nutrition WHERE user_id = $1`,
        [user_id]
        );

        const nutritionMax = result.rows[0].max;
        return nutritionMax;
    }
  }
  
  module.exports = Nutrition;