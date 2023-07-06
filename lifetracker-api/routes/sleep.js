const express = require("express")
const router = express.Router()
const Sleep = require("../models/sleep")

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

module.exports = router;