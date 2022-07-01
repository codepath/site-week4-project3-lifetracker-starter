const express = require('express')
const Nutrition = require('../models/nutrition')
const security = require('../middleware/security')
const router = express.Router()


router.get("/", async (req,res,next) => {
    try
    {
        //list all nutrition instances
        const nutrition = await Nutrition.listNutritionForUser()
        return res.status(200).json({nutrition})
    }
    catch(error)
    {
        next(error)
    }
})

router.post("/", security.requireAuthenticatedUser, async (req,res,next) => {
    try
    {
        //list all nutrition instances
        const {user} = res.locals
        const nutrition = await Nutrition.createNutrition({user, nutrition: req.body})
        return res.status(201).json({nutrition})
    }
    catch(error)
    {
        next(error)
    }
})

router.get("/:nutritionId", async (req,res,next) => {
    try
    {
        //fetch nutrition by id
        const {nutritionId} = req.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)
        return res.status(200).json({nutrition})
    }
    catch(error)
    {
        next(error)
    }
})

module.exports = router