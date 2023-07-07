const express = require("express");
const router = express.Router();
const Nutrition = require('../models/nutrition')
const security = require('../middleware/security')

router.post('/new', security.extractUserFromJWT, async (req, res, next) => {
    try {
        const { user }  = res.locals
        const newNutrition = await Nutrition.createNutrition({ user, nutrition: req.body});
        return res.status(200).json({newNutrition})
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try{
        const { user } = res.locals
        const nutrition = await Nutrition.listNutrition(req.body, user)
        return res.status(200).json({nutrition: nutrition})
    } catch (err) {
        next(err)
    }
})
module.exports = router