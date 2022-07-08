const express = require("express")
const Nutrition = require("../models/nutrition")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router()

router.get("/", security.requireAuthenticatedUser, permissions.authedUserOwnsNutrition, async (req, res, next) =>{
    try {
        // get all nutrition items
        const { user } = res.locals
        const nutritions = await Nutrition.listNutritionForUser({ user })
        return res.status(200).json({ nutritions })
    } catch(err){
        next(err)
    }
})

router.post("/create", security.requireAuthenticatedUser, permissions.authedUserOwnsNutrition, async (req, res, next) => {
    try{
        // create a new nutrition item
        const { user } = res.locals
        const nutrition = await Nutrition.createNutrition({ user, nutrition: req.body})
        return res.status(201).json({ nutrition })
    } catch(err){
        next(err)
    }
})

router.get("/:nutritionId", security.requireAuthenticatedUser, permissions.authedUserOwnsNutrition, async (req, res, next) =>{
    try {
        // get a nutrition item by its id
        const { nutritionId } = req.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)
        return res.status(200).json({ nutrition })
    } catch(err){
        next(err)
    }
})

module.exports = router