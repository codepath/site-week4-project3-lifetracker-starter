const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require("../config")
const { UnauthorizedError } = require('../utils/errors')

//Create a function to get JWT from request
const jwtFrom = ({ headers}) => {
    if(headers?.authorization)
    {
        //Split authorization token
        const [scheme, token] = headers.authorization.split(" ")
        if(scheme.trim() === "Bearer")
        {
            return token
        }
    }
    return undefined;
}

//Create function to attach user to res object
const extractUserFromJwt = (req,res,next) => {
    try{
        const token = jwtFrom(req)
        if(token)
        {
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }
        return next()

    } 
    catch (error){
        return next()
    }
}

//Create a function to verify that authed user exists
const requireAuthenticatedUser = (req,res,next) => {
    try{
        const {user} = res.locals;
        if(!user?.email)
        {
            throw new UnauthorizedError()
        }
        return next()
    }
    catch(error)
    {
        return next(error)
    }
}

module.exports = {
    extractUserFromJwt,
    requireAuthenticatedUser
}