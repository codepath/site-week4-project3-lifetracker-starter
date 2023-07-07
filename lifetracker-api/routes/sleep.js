const express = require("express")
const router = express.Router()
const Sleep = require("../models/sleep")
const db = require('../db')

router.post("/", async function (req, res, next) {
    try{
        console.log("whats inside request: ", req.body)
    const sleep = await Sleep.sleepCreate(req.body)
     console.log("sleep info:", sleep)
        return res.status(201).json({sleep})
    }catch(err){
         next(err)
     }
})

router.get("/",async function (req, res, next) {
    const data = await db.query(`SELECT * FROM sleep`)
    return res.status(200).json(data.rows)
})


module.exports = router;