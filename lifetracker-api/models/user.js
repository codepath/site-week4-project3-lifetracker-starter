const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");
const { BCRYPT_WORK_FACTOR } = require("../config");
const crypto = require("crypto");


class User {
  static async createPublicUser(user) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      createdAt: user.created_at,
    };
  }
  static async login(creds) {
    const { email, password } = creds;
    const requiredCreds = ["email", "password"];

    if (email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "user registration",
      });
    } catch (err) {
      throw err;
    }

    const user = await User.fetchUserByEmail(email);
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      }
    }
    throw new UnauthorizedError("Invalid email/password combo");
  }

  static async getName(name) {
    try {
      const result = await db.query("SELECT name FROM user WHERE name = $1", [
        name,
      ]);
      return result;
    } catch (error) {
      console.error({ error });
    }
  }

  static async register(creds) {
    const { email, username, password, firstName, lastName } = creds;
    const requiredCreds = [
      "username",
      "email",
      "password",
      "firstName",
      "lastName",
    ];

    if (email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email.");
    }

    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "user registration",
      });
    } catch (err) {
      throw err;
    }

    const existingUserWithEmail = await User.fetchUserByEmail(email);
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const normalizedEmail = email.toLowerCase();

    const result = await db.query(
      `INSERT INTO users (
                username,
                password,
                first_name,
                last_name,
                email
                )
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id,
                          username,
                          email,            
                          first_name AS "firstName", 
                          last_name AS "lastName",
                          created_at
                        `,
      [username, hashedPassword, firstName, lastName, normalizedEmail]
    );

    const user = result.rows[0];

    return user;
  }

  static async fetchUserByEmail(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email.toLowerCase(),
    ]);

    const user = result.rows[0];
    return user;
  }

}

module.exports = User;
