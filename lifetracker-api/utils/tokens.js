const jwt = require('jsonwebtoken');

function generateJWT(jsonPayload, secretKey) {
  return jwt.sign(jsonPayload, secretKey);
}

function validateAndDecodeJWT(jwtToken, secretKey) {
  try {
    const decoded = jwt.verify(jwtToken, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Invalid JWT');
  }
}

module.exports = {
  generateJWT,
  validateAndDecodeJWT,
};