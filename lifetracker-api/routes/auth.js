const express = require('express');
const User = require('../models/user');
const {createUserJwt} = require('../utils/tokens');
const security = require('../middleware/security');
const router = express.Router();

router.get('/me', security.requireAuthenticatedUser, async (req, res, next) => {
    try{
        //const user = await User.getMe();
        //return res.status(200).json({user});
        //use security to check if there is a token
        const {email} = res.locals.user;
        const user = await User.fetchUserByEmail(email);
        const publicUser = await User.makePublicUser(user);
        return res.status(200).json({user: publicUser});
    } catch(error) {
        next(error);
    }
})

router.post('/login', async (req, res, next) => {
    try{
        //take users email and password and attempt to authenticate them
        const user = await User.login(req.body);
        const token = createUserJwt(user);
        return res.status(200).json({user, token});
    } catch(error) {
        next(error);
    }
});

router.post('/register', async (req, res, next) => {
    try{
        //take users email, password, first name, last name and create new user in database
        const user = await User.register(req.body);
        const token = createUserJwt(user);
        return res.status(201).json({user, token});
    } catch(error) {
        next(error);
    }
});

module.exports = router