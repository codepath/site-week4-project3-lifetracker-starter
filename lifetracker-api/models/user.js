"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")

const { BCRYPT_WORK_FACTOR } = require("../config")

/** Database interface for users. */

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's id or user's password
   *
   *
   * @param {User} user - user from database
   * @returns
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }

  /**
   * authenticate user with username, password.
   *
   * Throws UnauthorizedError is user not found or wrong password.
   *
   * @returns user
   **/

  static async authenticate(creds) {
    const { email, password } = creds
    const requiredCreds = ["email", "password"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user authentication" })
    } catch (err) {
      throw err
    }

    const user = await User.fetchUserByEmail(email)

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password)
      if (isValid === true) {
        return User._createPublicUser(user)
      }
    }

    throw new UnauthorizedError("Invalid username/password")
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    const { email, password, firstName, lastName, username, isAdmin } = creds
    const requiredCreds = ["email", "password", "firstName", "lastName", "username", "isAdmin"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user registration" })
    } catch (err) {
      throw err
    }

    const existingUserWithEmail = await User.fetchUserByEmail(email)
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`)
    }

    const existingUserWithUsername = await User.fetchUserByUsername(username)
    if (existingUserWithUsername) {
      throw new BadRequestError(`Duplicate username: ${username}`)
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()

    const result = await db.query(
      `INSERT INTO users (
          username,
          password,
          first_name,
          last_name,
          email,
          is_admin
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id,
                  username,
                  email,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  is_admin AS "isAdmin"`,
      [username, hashedPassword, firstName, lastName, normalizedEmail, isAdmin]
    )

    const user = result.rows[0]

    return user
  }

  /**
   * Fetch a user in the database by username
   *
   * @param {String} username
   * @returns
   */
  static async fetchUserByUsername(username) {
    const result = await db.query(
      `SELECT id,
              email,
              username,      
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
      [username]
    )

    const user = result.rows[0]

    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
              email,
              username,      
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              is_admin AS "isAdmin"
           FROM users
           WHERE email = $1`,
      [email.toLowerCase()]
    )

    const user = result.rows[0]

    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} userId
   * @returns
   */
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id,
              email,
              username,      
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              is_admin AS "isAdmin"
           FROM users
           WHERE id = $1`,
      [userId]
    )

    const user = result.rows[0]

    return user
  }
}

module.exports = User
