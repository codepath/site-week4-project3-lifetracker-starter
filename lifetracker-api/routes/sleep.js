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

// router.get("/activity", async function (req, res, next)  {
//     try {
//       const queryResult = await db.query('SELECT AVG(EXTRACT(EPOCH FROM (endTime - startTime)) / 3600) AS avg_hours_slept FROM sleep');
//       const { avg_hours_slept } = queryResult.rows[0];
//       res.json({ avgHoursSlept: avg_hours_slept });
//     } catch (error) {
//       // Handle any errors that occur during the database query
//       res.status(500).json({ error: 'An error occurred while retrieving the average hours slept.' });
//     }
//   });

module.exports = router;