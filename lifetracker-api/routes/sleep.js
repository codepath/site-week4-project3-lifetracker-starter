const express = require("express");
const router = express.Router();
const Sleep = require('../models/sleep')
const security = require('../middleware/security')

router.post('/new', security.extractUserFromJWT, async (req, res, next) => {
    try {
        const { user }  = res.locals
        const newSleep = await Sleep.logSleep({ user, sleep: req.body});
        return res.status(200).json({newSleep})
    } catch (err) {
        next(err);
    }
});

// router.get('/', async (req, res, next) => {
//     try{
//         const nutritionList = await Nutrition.listNutrition()
//         return res.status(200).json({nutritionList})
//     } catch (err) {
//         next(err)
//     }
// })
module.exports = router