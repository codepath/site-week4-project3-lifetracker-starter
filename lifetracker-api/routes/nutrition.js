const express = require("express")
const Nutrition = require("../models/nutrition")
const router = express.Router()

router.get("/", async (req, res, next) =>{
    try {
        // get all nutrition items
    } catch(err){
        next(err)
    }
})

router.post("/", async (re, res, next) => {
    try{
        // create a new nutrition item
    } catch(err){
        next(err)
    }
})

router.get("/:nutritionId", async (req, res, next) =>{
    try {
        // get a nutrition item by its id
    } catch(err){
        next(err)
    }
})

module.exports = router