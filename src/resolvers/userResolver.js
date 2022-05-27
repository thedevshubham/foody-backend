const UserController = require("../controllers/UserController");
const verifyToken = require("../middleware/auth");

let userController = new UserController();

const userQuery = {
  // Fetch list of user
  users: (root, args, context, info) => userController.getUsers(),
};

const userMutation = {
  // Create new user in user list
  createUser: (root, args, context, info) => userController.addUser(args),

  // Update user detail based on id
  updateUser: (root, args, context, info) => {
    verifyToken(context.token);
    return userController.updateUser(args);
  },

  // Delete specific user from list
  deleteUser: (root, args, context, info) => {
    verifyToken(context.token);
    return userController.deleteuser(args);
  },
};

module.exports = {
  userQuery,
  userMutation,
};
