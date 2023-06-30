const express = require("express")
const router = express.Router(); 
const User = require("../models/user")

//route for login-need to create a user variable which is created once user is authenticated by checking database
router.post("/login", async function(req,res, next){
    try{
        const user = await User.authenticate(req.body) //takes in user input from body of page as a paramater for authenticate method
        return res.status(200).json({user})

    }catch(err){
        next(err)
    }
})

router.post("/register", async function(req, res,next){
    try{
        const user = await User.register(req.body)
        return res.status(201).json({user})
    }catch(err){
        next(err)
    }
})


module.exports = router; 