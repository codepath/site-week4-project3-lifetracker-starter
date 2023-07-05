const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require('../config')

function generateAuthToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, SECRET_KEY, { algorithm: "HS256", expiresIn: "1h" });
    return token
}

function verifyAuthToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (err) {
      return null;
    }
}


module.exports = {
    verifyAuthToken,
    generateAuthToken
}
