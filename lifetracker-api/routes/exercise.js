//Routes for authentication
const express = require("express")
const User = require("../models/user")
const security = require("../middleware/security");
const Exercise = require("../models/exercise"); 
const {authenticateJWT} = require("../middleware/security")
const router = express.Router()


router.post("/", async (req,res,next) => {
    try{
        //add new exercise
        const {user} = res.locals
        const exercise = await Exercise.createNewExercise({user, exercise: req.body})
        console.log("exercise route")
        console.log(exercise)
        console.log(user)
        console.log(req.body)
        return res.status(201).json({user, exercise})
    } catch (err){
        next(err)
    }
})

// router.get("/", async(req, res, next) => {
//     try{    
//         //list all exercises
//         const exercise = await Exercise.listAllExercise(req.body)
//         return res.status(200).json({exercise})
//     } catch (eer){
//         next(err)
//     }
// })

router.get("/", security.requiredAunthenticatedUser, async (req,res,next) => {
    try{
        //add new exercise
        const email = res.locals
        console.log("REQ")
        console.log(req.locals)
        const exercises = await Exercise.listExercisesByUserEmail(email)
        console.log("exercise route")
        console.log(exercises)
        return res.status(201).json({ exercises})
    } catch (err){
        next(err)
    }
})
router.get("/total", async (req, res, next) => {
    try {
      const { email } = res.locals;
      //console.log(email)
      const total = await Exercise.getTotalDuration(email);
      return res.status(200).json({ total});
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;