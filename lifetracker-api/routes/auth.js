const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body);
    const token = await User.generateUserToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body);
    const token = await User.generateUserToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/exercise", async function (req, res, next) {
  try {
    console.log("here")
    const exercise = await User.insertExercise(req.body);
    
    return res.status(201).json({ exercise })
  } catch (err) {
    next(err);
  }
});
module.exports = router;
