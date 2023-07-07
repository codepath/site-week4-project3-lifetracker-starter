const express = require("express")
const router = express.Router(); 
const User = require("../models/user")
const jwt= require("jsonwebtoken")
require("dotenv").config

//route for login-need to create a user variable which is created once user is authenticated by checking database
router.post("/login", async function(req,res, next){
    
    try{
      const user = await User.authenticate(req.body) //takes in user input from body of page as a paramater for authenticate method      
       const token=jwt.sign(
        {userId:user.id, username:user.username},
        "SECRET_KEY", {
            expiresIn:"1h",}
        );
       
       return res.status(200).json(
        {message:"login successfully",token:token,
        user:user})
        

    }catch(err){
        next(err)
    }
})

router.post("/register", async function(req, res,next){
    
    try{
        console.log("whats inside request: ", req.body)
    const user= await User.register(req.body)
     console.log("user info:", user)
        const token=jwt.sign({userId:user.id, username: user.username},
            "SECRET_KEY",
             {
                expiresIn:"1h",
            }
            )

        return res.status(201).json(
            {message:"user register successful",
             token:token,
            user:user})
        
    }catch(err){
         next(err)
     }
})


module.exports = router; 