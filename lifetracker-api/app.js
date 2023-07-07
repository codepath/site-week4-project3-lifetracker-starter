const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { NotFoundError } = require("./utils/errors")
const config = require("./config")
const authRoutes = require("./routes/auth")
const sleepRoutes = require("./routes/sleep")
const db = require('./db')
const app = express()

app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("tiny"))

//enabling the /auth route - using the imported auth routes
app.use("/auth", authRoutes)

app.use("/sleep", sleepRoutes)

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