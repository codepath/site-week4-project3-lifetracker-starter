const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require('../config')

function verifyAuthToken(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      return null;
    }
}

function generateAuthToken(user) {
    const payload = {
      id: user.id,
      firstname: user.first_name,
      lastname: user.last_name,
      email: user.email,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token
}

module.exports = {
    verifyAuthToken,
    generateAuthToken
}
