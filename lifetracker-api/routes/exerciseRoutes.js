const express = require("express")
const router = express.Router(); 
const Exercise = require("../models/exercise")
const jwt= require("jsonwebtoken")
require("dotenv").config



router.get("/exercisesCompleted/:id", async function(request, response, next){
    //list all the exercise recordings or throw an error
    const userIdReq=request.params.id
    console.log(userIdReq)


    try{
       const exercisesCompleted= await Exercise.fetchExercisebyId({userIdReq})
       console.log(exercisesCompleted)
       return response.status(201).json({exercisesCompleted:exercisesCompleted})

    }
    catch(err){
    next(err)
     }
})


router.post("/newExercise", async function(request, response, next){
   
    //create a new exercise or throw an error
    console.log("post stuff")
    const exercise=request.body
    console.log(exercise)
    try{
      const exercise_created= Exercise.createNewExercise({exercise})
      
    }
    catch(err){
    next(err)
     }
})


module.exports = router