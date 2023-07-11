const User = require('../models/user')

const authenticateJWT = async (req, res, next) => {
    // Extract the token from the authorization header
    const token = req.headers.authorization?.split(' ')[1]
    //if Token is missing
    if (!token) {
        return res.status(401).json({ error: 'Missing authorization token' })
    }

    try {
        //verify the auth token
        const decoded = User.verifyAuthToken(token)
        //if token can't be verified
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token' })
        }
        //get the user by the id
        const user = await User.getById(decoded.id)
        //if can't find the user
        if (!user) {
            return res.status(401).json({ error: 'User not found' })
        }

        // Attach the user object to the request for further use
        req.user = user

        next()
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = { authenticateJWT }