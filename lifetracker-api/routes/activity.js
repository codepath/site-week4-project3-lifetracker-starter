const express = require("express")
const User = require("../models/user")
const Activity = require("../models/activity")
const security = require("../middleware/security");
const Exercise = require("../models/exercise"); 
const {authenticateJWT} = require("../middleware/security")
const router = express.Router()


router.get("/totalDuration", async (req, res, next) => {
    try {
      const { email } = res.locals;
      console.log(email)
      const  total_exercise = await Activity.sumMinsOfExerciseForUser(email);
      return res.status(200).json({ total_exercise });
    } catch (err) {
      next(err);
    }
  });