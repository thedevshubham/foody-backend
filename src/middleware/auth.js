const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../config");

const verifyToken = (token) => {
  if (!token) {
    throw new Error("A token is required for authentication");
  }
  try {
    return jwt.verify(token, TOKEN_KEY);
  } catch (err) {
    throw new Error("Invalid Token");
  }
};

module.exports = verifyToken;
