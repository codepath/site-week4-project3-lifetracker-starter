const express = require("express");
const router = express.Router();
const Activity = require('../models/activity')
const security = require('../middleware/security')
require('colors')

router.get('/', security.extractUserFromJWT, async (req, res, next) => {
    try {
        const { user } = res.locals;
        const avgCalories = await Activity.getAverageCaloriesByDay(user)
        return res.status(200).json({avgCalories});
    } catch (err) {
        next(err)
    }
})

module.exports = router