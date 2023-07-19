const jwt = require('jsonwebtoken')
const {UnauthorizedError} = require('../utils/errors')
const {SECRET_KEY} = require("../config")
const jwtFrom = ({headers}) => {
    console.log(headers, "headers")
    if(headers?.authorization){
        const [scheme, token] = headers.authorization.split(" ")
        console.log(scheme, "scheme")
        console.log(token, "token")

        if (scheme.trim() === "Bearer"){
            return token
        }
    }
    return undefined
}

const extractUserFromJwt = (req,res,next) => {
    try {
        const token = jwtFrom(req)
        console.log(token, "token here")
        if(token){
            res.locals.user = jwt.verify(token,SECRET_KEY)
            console.log(res.locals.user, "reslocalsuser here")
        }
        return next()
    }catch(err){
        return next()
    }
}
// function to verify user by jwt signature
const requireAuthUser = (req,res,next) => {
    try{
        console.log(res.locals, "reslocals here")
        const {email} = res.locals
        console.log(email)
        if (email){
            throw new UnauthorizedError()
        }
        return next()
    }catch(err){
        return next(err)
    }
}
module.exports = {
    extractUserFromJwt,
    requireAuthUser
}

