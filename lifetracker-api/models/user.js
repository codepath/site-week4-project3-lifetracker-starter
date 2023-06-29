const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const db = require("../database");
const bcrypt = require("bcrypt");
// const { use } = require("../app");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  static async register(creds) {
    console.log(creds);
    const {
      email,
      username,
      first_name,
      last_name,
      password
    } = creds;
    const requiredCreds = [
      "email",
      "password",
      "username",
      "first_name",
      "last_name"
    ];
    // try {
    //   validateFields({ required: requiredCreds, obj: creds, location: "user registration" })
    // } catch (err) {
    //   throw err
    // }

    const existingUserWithEmail = await User.fetchUserByEmail(email);
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    //   return false;
    }
    console.log(existingUserWithEmail)

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const normalizedEmail = email.toLowerCase();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const date = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    const datetime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    const created_at = datetime;
    const updated_at = datetime;

    const result = await db.query(
      `INSERT INTO users (
            email, 
            password, 
            username, 
            first_name, 
            last_name, 
            created_at, 
            updated_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
      [
        normalizedEmail,
        hashedPassword,
        username,
        first_name,
        last_name,
        created_at,
        updated_at,
      ]
    );

    const user = result.rows[0];
    console.log(user);

    return true;
  }
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
                  email, 
                  password,
                  first_name,
                  last_name             
               FROM users
               WHERE email = $1`,
      [email.toLowerCase()]
    );

    const user = result.rows[0];

    return user;
  }
}
module.exports = User;
