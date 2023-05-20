const Sleep = require("../../models/sleep")
const { UnauthorizedError, ForbiddenError } = require("../../utils/errors")

/**
 * Checks to make sure that the authenticated user is the owner of the sleep.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the sleep to res.locals
 *
 */
const userIsSleepOwner = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { sleepId } = req.params
    const sleep = await Sleep.fetchById(sleepId)

    if (sleep.userId !== user.id) {
      throw new ForbiddenError("User is not allowed to fetch other users' sleep.")
    }

    res.locals.sleep = sleep

    return next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  userIsSleepOwner,
}
