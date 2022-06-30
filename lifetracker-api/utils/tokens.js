require("dotenv").config()
const req = require("express/lib/request")
const jwt = require("jsonwebtoken")
const { UnauthorizedError } = require("./errors")


const SECRET_KEY = process.env.SECRET_KEY || '0a591b05138e90a8ff496d1336bdd19d50b18b3e33150ecc4a606f427ed75941c8365656ab68cbf8cfe53dd4cae5d46137e2338f68c2cfc40fc74f612bc31671'

function generateAccessToken(user) {
    return jwt.sign(user, SECRET_KEY);
}

function validateAccessToken(token, next) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err)
        {
            throw new UnauthorizedError("Invalid token to access user's information")
        }
        req.user = user
        next()
    })
}

module.exports = {
    generateAccessToken,
    validateAccessToken
}