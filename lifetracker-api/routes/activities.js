/** Routes for activities. */

const express = require("express");
const Nutrition = require("../models/nutrition");
const router = express.Router();

// Receiving nutrition info from front-end form
router.post("/nutrition", async function (req, res, next) {
  try {
    // Call register method to record activity
    const nutrition = await Nutrition.register(req.body); //controller
    return res.status(201).json({ nutrition });
  } catch (err) {
    next(err);
  }
});

router.post("/nutritionfeed", async function (req, res, next) {
  try {
    const nutrition = await Nutrition.getAllNutrition(req.body.userId);
    res.status(200);
    res.json({ nutrition });
  } catch (err) {
    next(err);
  }
});

router.post("/nutritionavgcalories", async function (req, res, next) {
  try {
    const nutrition = await Nutrition.getAverageDailyCalories(req.body.userId);
    res.status(200);
    res.json({ nutrition });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
