const express = require('express')
const router = express.Router()


router.get("/", async (req,res,next) => {
    try
    {
        //list all nutrition instances
    }
    catch(error)
    {
        next(error)
    }
})

router.post("/", async (req,res,next) => {
    try
    {
        //create new nutrition
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
    }
    catch(error)
    {
        next(error)
    }
})

module.exports = router