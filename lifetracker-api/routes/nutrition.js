const express = require("express")
const router = express.Router()
const Nutrition = require("../models/nutrition")

router.get("/", async (req, res, next) => {
    // get all nutrition for specific user
    try{
        const nutrition = await Nutrition.listNutritionForUser(1)
        return res.status(201).json({nutrition})
    }catch(err){
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try{
        const nutrition = await Nutrition.createNutrition(req.body)
        return res.status(201).json({nutrition})
    }catch(err){
        next(err)
    }
})

router.get("/id/:nutritionId", async(req, res, next) => {
    try{
        const nutrition = await Nutrition.fetchNutritionById(Number(req.params.nutritionId))
        return res.status(201).json({nutrition})
    }catch(err){
        next(err)
    }
})

module.exports = router