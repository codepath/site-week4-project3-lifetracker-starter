//routes for getting data from user nutrition, sleep, and exercise input
const db = require("../db")
const express = require("express")
const router = express.Router()
const Nutrition = require("../models/nutrition")

//use post request to send data from users to database 
router.post("/", async function (req,res, next){

    console.log("whats inside request: ", req.body)

        const nutrition = Nutrition.create(req.body)
        console.log("nutrition info:", nutrition)

        return res.status(201).json({nutrition})

})

//use get request to get desired information for frontend
router.get("/", async function(req,res,next){

    const data = await db.query(`SELECT * FROM nutrition`)
    console.log("nutrition information from data: ", data.rows)
    return res.status(200).json(data.rows)

})
module.exports = router;