const Nutrition = require("../models/nutrition.js")
const {BadRequestError, ForbiddenError} = require("../utils/errors")

//ensure authenticated user is owner of nutrition
//if not, throw an error
const authedUserOwnsNutrition = async (req, res, next) => {
    try{
        const {user} = res.locals
        const {nutritionId} = req.params
        const nutrition = await Nutrition.fetchNutritionById(nutritionId)
        

        if (nutrition.userEmail != user.email){
            throw new ForbiddenError("User is not allowed to access other users' nutrition")
        }

        res.locals.nutrition = nutrition

        return next()
    }catch(err){
        return next(err)
    }
}


const authedUserOwnsNutritionList = async (req, res, next) => {
    try{
        const {user} = res.locals
        const nutrition = await Nutrition.listNutritionForUser(user)
        

        if (nutrition[0].userEmail != user.email){
            throw new ForbiddenError("User is not allowed to access other users' nutrition list")
        }

        res.locals.nutritionList = nutrition

        return next()
    }catch(err){
        return next(err)
    }
}


module.exports = {
    authedUserOwnsNutrition,
    authedUserOwnsNutritionList
}