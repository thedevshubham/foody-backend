const AuthController = require("../controllers/AuthController");

let authController = new AuthController();

const authMutation = {
  // sign up a user
  signIn: (root, args, context, info) => authController.signIn(args),

  // sign in a user
  signUp: (root, args, context, info) => authController.signUp(args),
};

module.exports = {
  authMutation,
};
