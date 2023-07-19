const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const Stats = require("../utils/stats");
const All = require("../utils/all");

class User {
  static async _createPublicUser(user) {
    const exercise = await All.exercise(user.id);
    const sleep = await All.sleep(user.id);
    const nutrition = await All.nutrition(user.id);

    const userInfo = {
      id: user.id,
      first_name: user.first_name,
      username: user.username,
      email: user.email,
    };

    return {
      user: userInfo,
      exercise: exercise,
      sleep: sleep,
      nutrition: nutrition,
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
    const user = All.insertUsers(
      normalizedEmail,
      hashedPassword,
      username,
      first_name,
      last_name
    );

    return user;
  }

  static async fetchUserByEmail(email) {
    const user = await All.fetchUser(email);
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

    const user = await All.insertExercise(
      name,
      category,
      duration,
      intensity,
      id
    );

    return user;
  }

  static async insertSleep(data) {
    const { start_time, end_time, id } = data;

    const user = await All.insertSleep(start_time, end_time, id);

    return user;
  }

  static async insertNutrition(data) {
    const { name, category, quantity, calories, image_url, id } = data;

    const user = await All.insertNutrition(
      name,
      category,
      quantity,
      calories,
      image_url,
      id
    );

    return user;
  }

  static async sendSummary(idInfo) {
    const { id } = idInfo;
    const sumExerciseMins = await Stats.sumExerciseMins(id);
    const avgSleepHours = await Stats.avgSleepHours(id);
    const totalNumSleep = await Stats.totalNumSleep(id);
    const averageExerciseInt = await Stats.averageExerciseInt(id);
    const maxCalsInOneMeal = await Stats.maxCalsInOneMeal(id);
    const averageDailyCalories = await Stats.averageDailyCalories(id);

    return {
      sumExerciseMins: sumExerciseMins,
      avgSleepHours: avgSleepHours,
      totalNumSleep: totalNumSleep,
      averageExerciseInt: averageExerciseInt,
      maxCalsInOneMeal: maxCalsInOneMeal,
      averageDailyCalories: averageDailyCalories,
    };
  }
}

module.exports = User;
