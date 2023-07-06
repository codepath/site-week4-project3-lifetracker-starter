
/** Routes for authentication. */

const express = require("express")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const router = express.Router()
const {SECRET_KEY} = require('../config')

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body);

    const token = jwt.sign(
      { user: {id: user.id, 
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email} },
      "SECRET_KEY",
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: user,
    });
  } catch (err) {
    next(err);
  }
});


router.post("/register", async function (req, res, next) {
  console.log("hit register route")
  console.log("regsiter body", req.body)
  try {
    const user = await User.register(req.body) //controller 

    const token = jwt.sign(
      { user: {id: user.id, 
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email} },
      "SECRET_KEY",
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: user,
    });

  } catch (err) {
    next(err)
  }
})


module.exports = router