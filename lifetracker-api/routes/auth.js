const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { generateAuthToken } = require("../utils/tokens");
const security = require("../middleware/security");

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = generateAuthToken(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body);
    const token = generateAuthToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.get("/me", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const {password, ...userNoPassword} = user
    return res.status(200).json({ user: userNoPassword })

  } catch (err) {
    next(err);
  }
});

module.exports = router;
