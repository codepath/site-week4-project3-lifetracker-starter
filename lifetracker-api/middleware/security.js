const jwt = require('jsonwebtoken')
const {UnauthorizedError} = require('../utils/errors')
const SECRET_KEY = abc123


const jwtFrom = ({headers}) => {
    if(headers?.authorization){
        const [scheme,token] = headers.authorization.split(' ')
        if (scheme.trim() === "Bearer"){
            return token
        }
    }
    return undefined
}

const extractUserFromJwt = (req,res,next) => {
    try {
        const token = jwtFrom(req)
        if(token){
            res.locals.user = jwt.verify(token,SECRET_KEY)
        }
        return next()
    }catch(err){
        return next()
    }
}
// function to verify user by jwt signature
const requrireAuthUser = (req,res,next) => {
    try{
        const {user} = res.locals
        if (!user?.email){
            throw new UnauthorizedError()
        }
        return next()
    }catch(err){
        return next(err)
    }
}
module.exports = {
    extractUserFromJwt,
    requrireAuthUser
}

