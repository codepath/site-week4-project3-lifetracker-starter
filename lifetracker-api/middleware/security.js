const { verifyAuthToken } = require("../utils/tokens");
const { UnauthorizedError } = require("../utils/errors");

const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ");
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }
  return undefined;
};

const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req);
    if (token) {
      res.locals.user = verifyAuthToken(token);
    }
    return next();
  } catch (error) {
    return next();
  }
};

const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals;
    if (!user?.email) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  extractUserFromJwt,
  requireAuthenticatedUser,
};
