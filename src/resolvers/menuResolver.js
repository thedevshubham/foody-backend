const MenuController = require("../controllers/MenuController");
const verifyToken = require("../middleware/auth");

let menuController = new MenuController();

const menuMutation = {
  // get menu based on id
  getMenu: (root, args, context, info) => {
    verifyToken(context.token);
    return menuController.getMenu(args);
  },
};

module.exports = {
  menuMutation,
};
