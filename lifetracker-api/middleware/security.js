const jwt = require("jsonwebtoken")
import { SECRET_KEY } from "../config"
import { UnauthorizedError } from "../utils/erros"

const jwtFrom = ({headers}) =>{
    //Authorization
    if(headers?.authorization){
        const [scheme,token] = headers.authorization.split(" ")
        if (scheme.trim() === "Bearer") {
            return token
        }
    }
    return undefined // no authorization header or incorrect authentication scheme
}

const extractUserFromJwt = (req, res, next) => {
    try{
        const token = jwtFrom(req)
        if (token){
            res.locals.user = jwt.verify(token, SECRET_KEY)
        }
        return next ()
    }  catch(err){
        return next()
    }
}

const requiredAunthenticatedUser = (req,res,next) => {
    try {
       const {user} = res.locals
       if(!user?.email){
        throw new UnauthorizedError()
       } 
       return next()
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    requiredAunthenticatedUser,
    extractUserFromJwt
}


