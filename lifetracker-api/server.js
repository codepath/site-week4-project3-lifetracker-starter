const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const { BadRequestError,NotFoundError } = require("./utils/erros.js")
const {PORT} = require("./config")
const authRoutes = require("./routes/auth")
const security = require ("./middleware/security.js")

const app = express();



app.use(cors())
app.use(express.json())
app.use(morgan ("tiny"))
app.use(security.extractUserFromJwt)


app.use("/auth", authRoutes)

app.use(function(req,res,next){
    return next(new NotFoundError())
})


//handle errors that happen during the request/response cycle.
app.use((error, req, res, next) =>{
    const status = error.status || 500; // determines the HTTP status code of the error or defaults to 500
    const message = error.message;

    return res.status(status).json ({
        error: {message, status},
    })

})

app.listen(PORT,() =>{
    console.log(`🚀 Server listening on port ` + PORT)
})