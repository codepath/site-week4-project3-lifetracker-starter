"use strict"
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Exercise {
    // ...
  
    /**
     * Add a new exercise to the database for a specific user.
     *
     * @param {string} name - Exercise name
     * @param {string} category - Exercise category
     * @param {number} time - Exercise time in minutes
     * @param {string} intensity - Exercise intensity
     * @param {number} userId - ID of the user associated with the exercise
     * @returns {object} - The inserted exercise object
     */
    static async addExercise(exerciseInfo) {
        const { name, category, time, intensity, user_id } = exerciseInfo
      const result = await db.query(
        `INSERT INTO exercise (name, category, time, intensity, user_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, category, time, intensity, user_id]
      );
  
      const exercise = result.rows[0];
  
      return exercise;
    }

    static async getExercisesByUserId(user_id) {
        const result = await db.query(
          `SELECT * FROM exercise WHERE user_id = $1`,
          [user_id]
        );
      
        const exercises = result.rows;
      
        return exercises;
    }

    static async getTimeByUserId(user_id){

        const result = await db.query(
        `SELECT SUM(time) FROM exercise WHERE user_id = $1`,
        [user_id]
        );

        const exerciseTime = result.rows[0].sum;
        return exerciseTime;
    }

    static async getAvgByUserId(user_id){
        const result = await db.query(

        `SELECT AVG(intensity) FROM exercise WHERE user_id = $1`,
        [user_id]
        );

        const exerciseAvg = result.rows[0].avg;
        return exerciseAvg;
    }
  }
  
  module.exports = Exercise;