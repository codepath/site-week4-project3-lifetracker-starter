const express = require('express');
const User = require('../models/user');
const Nutrition = require('../models/nutrition')
const {createUserJwt} = require('../utils/tokens');
const security = require('../middleware/security');
const router = express.Router();

router.get('/', security.requireAuthenticatedUser, async (req, res, next) => {
    try{
        //list all posts
        const {user} = res.locals;
        const nutritions = await Nutrition.listNutritionForUser({user});
        return res.status(201).json({nutritions})
    } catch(error) {
        next(error);
    }
})

router.post('/', security.requireAuthenticatedUser, async (req, res, next) => {
    try{
        //create a new nutrition post
        const {user} = res.locals;
        const nutrition = await Nutrition.createNutrition({user, nutrition: req.body});
        return res.status(201).json({nutrition})
    } catch(error) { 
        next(error);
    }
});

router.get('/:nutritionId', async (req, res, next) => {
    try{
        //fetch single post
    } catch(error) {
        next(error);
    }
});

module.exports = router