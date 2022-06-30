const { BadRequestError } = require("../utils/errors")
const { validateAccessToken } = require("../utils/tokens")

// middleware will do these steps..
// 1) check authentication header
// 2) extract the json payload
// 3) attach it to the response's local property

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authentication
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) 
    {
        throw new BadRequestError("No header passed when trying to access information regarding user")
    }
    validateAccessToken(token, next)
}

module.exports = authenticateToken