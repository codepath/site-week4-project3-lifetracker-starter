const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { NotFoundError } = require("./utils/errors")
const config = require("./config")
const authRoutes = require("./routes/auth")
const sleepRoutes = require("./routes/sleep")
const db = require('./db')
const app = express()
const createRoutes = require("./routes/nutrition")
const db = require("./db")

app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("tiny"))

//enabling the /auth route - using the imported auth routes
app.use("/auth", authRoutes)
app.use("/create", createRoutes)

app.use("/sleep", sleepRoutes)

//enabling the nutrition route - using the imported create route
app.use("/nutrition", createRoutes)

app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })

app.get("/activity", async function(req,res){

  const queryResult = await db.query(`SELECT AVG(EXTRACT(EPOCH FROM (endtime - starttime)) / 3600) AS avg_hours_slept FROM sleep`);
  const avg_hours_slept = queryResult.rows[0];

    console.log({avg_hours_slept});   
         
  return res.status(200).json({avg_hours_slept})
})

app.get("/activity", async function(req,res){
  const queryNutritionResult = await db.query(`SELECT AVG(calories) AS avg_calories FROM nutrition`)
  const avg_calories = queryNutritionResult.rows[0]

  console.log("avg calories: ", {avg_calories})
  return res.status(200).json({avg_calories})

})


// app.get("/activity", async function (req, res, next)  {
//     try {
//       // SELECT AVG(EXTRACT(EPOCH FROM (endtime - starttime)) / 3600) AS avg_hours_slept FROM sleep
//       const queryResult = await db.query(
//         'SELECT * FROM sleep');
//     //  const { avg_hours_slept } = queryResult.rows[0];
//       res.json(queryResult.rows);
//     } catch (error) {
//       // Handle any errors that occur during the database query
//       res.status(500).json({ error: 'An error occurred inside app.get activity.' });
//     }
//   });
  

  
  /** Handle 404 errors -- this matches everything */
  app.use(function (req, res, next) {
    return next(new NotFoundError())
  })


  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (!config.IS_TESTING) console.error(err.stack)
    const status = err.status || 500
    const message = err.message
  
    return res.status(status).json({
      error: { message, status },
    })
  })
  


module.exports = app