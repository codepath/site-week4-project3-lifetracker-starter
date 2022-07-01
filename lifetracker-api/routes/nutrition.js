const express = require("express")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const Nutrition = require("../models/nutrition")
const router = express.Router()

router.get("/", async (req,res,next) => {
    try{
        const nutrition = await Nutrition.listNutritionById()
        return res.status(200).json({ nutrition })
    } catch(err) {
        next(err)
    }
})

router.post("/", security.requireAuthenticatedUser, async (req,res,next) => {
    try{
        const { user } = res.locals
        const nutrition = await Nutrition.createNutrition({ user, nutrition: req.body})
        return res.status(201).json({ nutrition })
    } catch(err) {
        next(err)
    }
})

router.get("/:nutritionId", async (req,res,next) => {
    try{
        const  { nutritionId } = req.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)
        return res.status(200).json({ nutrition })
    } catch(err) {
        next(err)
    }
})


router.put("/:nutritionId", security.requireAuthenticatedUser, permissions.authedUserOwnsNutrition, async (req,res,next) => {
    try {
        const { nutritionId } = req.params
        const nutrition = await Nutrition.editNutrition({ nutritionUpdate: req.body, nutritionId})
        return res.status(200).json({ nutrition })
    } catch (err) {
        next(err)
    }
})

router.get("/", async (req,res,next) => {
    try{

    } catch(err) {
        next(err)
    }
})

module.exports = router