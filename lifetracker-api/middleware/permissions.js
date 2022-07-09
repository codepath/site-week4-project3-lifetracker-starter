const Nutrition = require("../models/nutrition")
const { BadRequestError, ForbiddenError } = require("../utils/errors")

/**
 * Checks to make sure that the authenticated user is the owner of the post.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the post to res.locals
 *
 */
const authedUserOwnsNutrition = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { nutritionId } = req.params
    const nutrition = await Nutrition.fetchNutritionById(nutritionId)

    if (nutrition.username !== user.username) {
      throw new ForbiddenError("User is not allowed to update other users' nutritions.")
    }

    res.locals.nutrition = nutrition

    return next()
  } catch (err) {
    return next(err)
  }
}

const authedUserIsNotNutritionOwner = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { nutritionId } = req.params
    const nutrition = await Nutrition.fetchNutritionById(nutritionId)

    if (nutrition.username === user.username) {
      throw new BadRequestError("Users are not allowed to rate their own nutrition data.")
    }

    res.locals.nutrition = nutrition

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  authedUserOwnsNutrition,
  authedUserIsNotNutritionOwner,
}