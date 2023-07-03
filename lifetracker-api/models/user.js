const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { BCRYPT_WORK_FACTOR } = require("../config");

const secretKey = crypto.randomBytes(64).toString("hex");

class User {
  static _createPublicUser(user) {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
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
               WHERE email = $1`,
      [email.toLowerCase()]
    );

    const user = result.rows[0];
    return user;
  }

  static async authenticate(creds) {
    const { email, password } = creds;
    const id = await User.fetchById(email);

    const user = await User.fetchUserByEmail(email);
    const exercise = await db.query(
      `SELECT 
        name,
        duration, 
        intensity,
        created_at
          FROM exercise
          WHERE user_id = $1`,
      [id]
    );

    try {
      if (user) {
        // compare hashed password to a new hash from password
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid === true) {
          const publicUser = User._createPublicUser(user);
          return { user: publicUser, exercise: exercise.rows };
        }
      }

      throw new UnauthorizedError("Invalid username/password");
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  static async insertExercise(data) {
    const { name, category, duration, intensity, email } = data;
    const id = await User.fetchById(email);

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

    // const createdAt = result.rows[0].created_at;
    // const createdAtUTC = new Date(createdAt);
    // const createdAtLocal = createdAtUTC.toLocaleString();

    // result.rows[0].created_at = createdAtLocal;

    // const result = await db.query(
    //   `SELECT
    //   name,
    //               duration,
    //               intensity,
    //               created_at
    //            FROM exercise
    //            WHERE user_id = $1`,
    //   [id]
    // );

    const user = result.rows[0];

    return user;
  }
  static generateUserToken(user) {
    const generateToken = (data) =>
      jwt.sign(data, secretKey, { expiresIn: "1h" });

    const payload = {
      firstname: user.first_name,
      lastname: user.last_name,
      username: user.username,
    };

    return generateToken(payload);
  }

  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id       
           FROM users
           WHERE email = $1`,
      [userId]
    );

    const user = result.rows[0].id;
    return user;
  }
}

module.exports = User;
