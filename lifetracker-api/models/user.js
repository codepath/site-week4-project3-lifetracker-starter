"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  /**
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns user
   **/

  static async authenticate(creds) {
    const { email, password } = creds;
    const requiredCreds = ["email", "password"];
    const user = await User.fetchUserByEmail(email);

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        return User._createPublicUser(user); //
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    const { email, password, firstName, lastName, username } = creds;
    const requiredCreds = [
      "email",
      "password",
      "firstName",
      "lastName",
      "username",
    ];

    const existingUserWithEmail = await User.fetchUserByEmail(email);
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const normalizedEmail = email.toLowerCase();

    const result = await db.query(
      `INSERT INTO users (
          password,
          first_name,
          last_name,
          email,
          username
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id,
                  email,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  username
                  `,
      [hashedPassword, firstName, lastName, normalizedEmail, username]
    );

    const user = result.rows[0];

    return user;
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
              email, 
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              username              
           FROM users
           WHERE email = $1`,
      [email.toLowerCase()]
    );

    const user = result.rows[0];

    return user;
  }
}

module.exports = User;
