//Holds the queries for all tables in the database
const db = require("../database");

class All {
  static async exercise(id) {
    const exercise = await db.query(
      `SELECT 
          name,
          duration, 
          intensity,
          created_at
            FROM exercise
            WHERE user_id = $1
            ORDER BY created_at DESC`,
      [id]
    );
    return exercise.rows;
  }
  static async sleep(id) {
    const sleep = await db.query(
      `SELECT 
          start_time,
          end_time
            FROM sleep
            WHERE user_id = $1
            ORDER BY created_at DESC`,
      [id]
    );
    return sleep.rows;
  }

  static async nutrition(id) {
    const nutrition = await db.query(
      `SELECT 
        name, 
        category,
        quantity,
        calories,
        image_url
            FROM nutrition
            WHERE user_id = $1
            ORDER BY created_at DESC`,
      [id]
    );
    return nutrition.rows;
  }
  static async insertUsers(
    normalizedEmail,
    hashedPassword,
    username,
    first_name,
    last_name
  ) {
    const result = await db.query(
      `INSERT INTO users (
          email, 
          password, 
          username, 
          first_name, 
          last_name
          )
          VALUES ($1, $2, $3, $4, $5)
          RETURNING             
                first_name, 
                last_name,
                username,
                email
      `,
      [normalizedEmail, hashedPassword, username, first_name, last_name]
    );
    return result.rows[0];
  }
  static async insertExercise(name, category, duration, intensity, id){
    const exercise = await db.query(
        `INSERT INTO exercise (
        name, 
        category, 
        duration, 
        intensity, 
        user_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING             
                    name, 
                    duration,
                    intensity,
                    created_at
    `,
        [name, category, duration, intensity, id]
      );
      return exercise.rows[0]
  
  }

  static async insertSleep(start_time, end_time, id){
    const sleep = await db.query(
        `INSERT INTO sleep (
        start_time, 
        end_time,
        user_id
        )
        VALUES ($1, $2, $3)
        RETURNING             
                    start_time, 
                    end_time
    `,
        [start_time, end_time, id]
      );
    return sleep.rows[0]
  }

  static async insertNutrition(name, category, quantity, calories, image_url, id){
    const nutrition = await db.query(
        `INSERT INTO nutrition (
        name, 
        category, 
        quantity, 
        calories, 
        image_url,
        user_id
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING             
                    name, 
                    category,
                    quantity,
                    calories,
                    image_url
    `,
        [name, category, quantity, calories, image_url, id]
      );
      return nutrition.rows[0]
  }
  static async fetchUser(info) {
    const fetchUser = await db.query(
      `SELECT id,
                  email, 
                  password,
                  first_name,
                  last_name,
                  username
               FROM users
               WHERE email = $1
              `,
      [info]
    );
    return fetchUser.rows[0]
  }
}

module.exports = All;
