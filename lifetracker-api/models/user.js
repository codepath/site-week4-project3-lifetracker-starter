const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const db = require("../database");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  static async _createPublicUser(user) {
    const exercise = await db.query(
      `SELECT 
        name,
        duration, 
        intensity,
        created_at
          FROM exercise
          WHERE user_id = $1
          ORDER BY created_at DESC`,
      [user.id]
    );

    const sleep = await db.query(
      `SELECT 
        start_time,
        end_time
          FROM sleep
          WHERE user_id = $1
          ORDER BY created_at DESC`,
      [user.id]
    );

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
      [user.id]
    );
    const userInfo = {
      id: user.id,
      first_name: user.first_name,
      username: user.username,
      email: user.email,
    };

    return {
      user: userInfo,
      exercise: exercise.rows,
      sleep: sleep.rows,
      nutrition: nutrition.rows,
    };
  }

  static async register(creds) {
    const { email, username, first_name, last_name, password } = creds;

    const existingUserWithEmail = await User.fetchUserByEmail(email);
    try {
      if (existingUserWithEmail) {
        throw new BadRequestError(`Duplicate email: ${email}`);
      }
    } catch (error) {
      console.error(error);
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const normalizedEmail = email.toLowerCase();

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

    const user = result.rows[0];

    return user;
  }
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
                  email, 
                  password,
                  first_name,
                  last_name,
                  username
               FROM users
               WHERE email = $1
              `,
      [email.toLowerCase()]
    );
    const user = result.rows[0];
    return user;
  }

  static async authenticate(creds) {
    const { email, password } = creds;

    const userInfo = await User.fetchUserByEmail(email);

    try {
      if (userInfo) {
        // compare hashed password to a new hash from password
        const isValid = await bcrypt.compare(password, userInfo.password);
        if (isValid === true) {
          const { user, exercise, sleep, nutrition } =
            await User._createPublicUser(userInfo);
          return {
            user: user,
            exercise: exercise,
            sleep: sleep,
            nutrition: nutrition,
          };
        }
      }

      throw new UnauthorizedError("Invalid username/password");
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async insertExercise(data) {
    const { name, category, duration, intensity, id } = data;

    const result = await db.query(
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

    const user = result.rows[0];

    return user;
  }

  static async insertSleep(data) {
    const { start_time, end_time, id } = data;

    const result = await db.query(
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

    const user = result.rows[0];

    return user;
  }

  static async insertNutrition(data) {
    const { name, category, quantity, calories, image_url, id } = data;

    const result = await db.query(
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

    const user = result.rows[0];

    return user;
  }

  static async sendSummary() {
    const sumExerciseMins = await db.query(
      `SELECT SUM(duration) AS total_minutes
      FROM exercise`
    );
    const avgSleepHours = await db.query(
      `SELECT AVG(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600) AS average_sleep_hours
FROM sleep;`
    );
    const totalNumSleep = await db.query(
      `SELECT SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 3600) AS total_sleep
      FROM sleep`
    )
    const averageExerciseInt = await db.query(
      `SELECT AVG(intensity) AS average_exercise_int
      FROM exercise;`
    )
    // const maxCalsInOneMeal = await db.query(
    //   `SELECT * FROM nutrition
    //   ORDER BY created_at = $1 DESC `
    // )
      console.log(averageExerciseInt)
    return averageExerciseInt.rows[0];
  }
}

module.exports = User;
