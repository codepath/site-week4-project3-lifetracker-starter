const express = require("express")
const router = express.Router(); 

//route for login-need to create a user variable which is created once user is authenticated by checking database
router.post("/login", async function(req,res, next){
    try{

    }catch(err){
        next(err)
    }
})

router.post("/register", async function(req, res,next){
    try{
        const user= await user.register(req.body)
        return res.status(201).json({ user })

    }catch(err){
        next(err)
    }
})

module.exports = router; 