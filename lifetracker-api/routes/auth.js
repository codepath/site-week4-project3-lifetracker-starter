const express = require("express");
const User = require("../models/user");
const router = express.Router();
const tokens = require("../utils/tokens");
const security = require("../middleware/security")

router.get("/me", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    console.log("does it continue on here")
    const { email } = res.locals.user
    const userInfo = await User.fetchUserByEmail(email)
    const { user, exercise, sleep, nutrition } = await User._createPublicUser(userInfo)
    return res.status(200).json({ user, exercise, sleep, nutrition })
  } catch (err) {
    console.log("or does it go in here")
    next(err)
  }
})

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body);
    const token = tokens.generateUserToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});
router.post("/login", async function (req, res, next) {
  try {
    const { user, exercise, sleep, nutrition } = await User.authenticate(
      req.body
    );
    const token = tokens.generateUserToken(user);
    return res.status(201).json({ user, exercise, sleep, nutrition, token });
  } catch (err) {
    next(err);
  }
});

router.post("/exercise", async function (req, res, next) {
  try {
    const exercise = await User.insertExercise(req.body);
    return res.status(201).json({ exercise });
  } catch (err) {
    next(err);
  }
});

router.post("/sleep", async function (req, res, next) {
  try {
    console.log("sleep");
    const sleep = await User.insertSleep(req.body);

    return res.status(201).json({ sleep });
  } catch (err) {
    next(err);
  }
});

router.post("/nutrition", async function (req, res, next) {
  try {
    console.log("here");
    const nutrition = await User.insertNutrition(req.body);

    return res.status(201).json({ nutrition });
  } catch (err) {
    next(err);
  }
});

router.post("/summarystats", async function (req, res, next) {
  try {
    const  avgSleepHours  = await User.sendSummary();

    return res.status(201).json({avgSleepHours});
  } catch (err) {
    next(err);
  }
});
module.exports = router;
