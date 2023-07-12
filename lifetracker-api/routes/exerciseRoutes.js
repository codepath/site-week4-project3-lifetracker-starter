const express = require("express")
const router = express.Router(); 
const Exercise = require("../models/exercise")
const jwt= require("jsonwebtoken")
require("dotenv").config



router.get("/exercisesCompleted/:id", async function(request, response, next){
    //list all the exercise recordings or throw an error
    const userIdReq=request.params.id
    console.log("get exercies",userIdReq)


    try{
       const exercisesCompleted= await Exercise.fetchExercisebyId(userIdReq)
       console.log("excercies completed",exercisesCompleted)
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

router.get("/totalExercise/:id", async function(request, response, next){
  //list all the exercise recordings or throw an error
  const userIdReq=request.params.id
  console.log("get exercies",userIdReq)


  try{
     const TotalExercises= await Exercise.totalExerciseMinutes(userIdReq)
 
     const total_exercise=TotalExercises[0]["sum"]
     console.log("Total exercises",parseInt(total_exercise))
     return response.status(201).json({total_exercise:total_exercise})

  }
  catch(err){
  next(err)
   }
})


module.exports = router