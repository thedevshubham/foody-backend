const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  TOKEN_KEY: process.env.TOKEN_KEY
};
