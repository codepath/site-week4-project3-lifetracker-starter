const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { NotFoundError } = require("./utils/errors")
const config = require("./config")
const authRoutes = require("./routes/auth")
const createRoutes = require("./routes/nutrition")
const db = require("./db")
const app = express()

app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("tiny"))

//enabling the /auth route - using the imported auth routes
app.use("/auth", authRoutes)

//enabling the nutrition route - using the imported create route
app.use("/nutrition", createRoutes)


app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })

app.get("/activity", async function(req,res){
  const queryNutritionResult = await db.query(`SELECT AVG(calories) AS avg_calories FROM nutrition`)
  const avg_calories = queryNutritionResult.rows[0]

  console.log("avg calories: ", {avg_calories})
  return res.status(200).json({avg_calories})
  
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