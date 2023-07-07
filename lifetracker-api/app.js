 const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { NotFoundError } = require("./utils/errors")
const config = require("./config")
const authRoutes = require("./routes/auth")
const nutritionRoutes = require("./routes/nutrition")
const sleepRoutes = require("./routes/sleep")
const db = require("./db")
const app = express()


app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("tiny"))

//enabling the /auth route - using the imported auth routes
app.use("/auth", authRoutes)

//enabling the nutrition route - using the imported nutrition route
app.use("/nutrition", nutritionRoutes)

//enabling the sleep route - using the imported sleep route
app.use("/sleep", sleepRoutes)

app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })

app.get("/activity", async function(req,res){
  const queryNutritionResult = await db.query(`SELECT AVG(calories) AS avg_calories FROM nutrition`)
  const avg_calories = queryNutritionResult.rows[0]

  const queryResult = await db.query(`SELECT AVG(EXTRACT(EPOCH FROM (endtime - starttime)) / 3600) AS avg_hours_slept FROM sleep`);
  const avg_hours_slept = queryResult.rows[0];

  console.log("avg calories: ", {avg_hours_slept})
  return res.status(200).json({avg_calories,avg_hours_slept})
  
})

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