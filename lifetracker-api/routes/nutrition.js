const express = require('express');
const User = require('../models/user');
const {createUserJwt} = require('../utils/tokens');
const security = require('../middleware/security');
const router = express.Router();

router.get('/', security.requireAuthenticatedUser, async (req, res, next) => {
    try{
        //list all posts
    } catch(error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try{
        //create a new nutrition post
    } catch(error) {
        next(error);
    }
});

router.get('/:nutritionId', async (req, res, next) => {
    try{
        //fetch single post
    } catch(error) {
        next(error);
    }
});

module.exports = router