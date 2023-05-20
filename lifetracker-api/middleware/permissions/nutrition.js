const Nutrition = require("../../models/nutrition")
const { UnauthorizedError, ForbiddenError } = require("../../utils/errors")

/**
 * Checks to make sure that the authenticated user is the owner of the exercise.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the exercise to res.locals
 *
 */
const userIsNutritionOwner = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { nutritionId } = req.params
    const nutrition = await Nutrition.fetchById(nutritionId)

    if (nutrition.userId !== user.id) {
      throw new ForbiddenError("User is not allowed to fetch other users' nutrition.")
    }

    res.locals.nutrition = nutrition

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  userIsNutritionOwner,
}
