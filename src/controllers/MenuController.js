let menuJson = require("../data/menu.json");

class MenuController {
  constructor() {
    this.getMenu = this.getMenu.bind(this);
  }

  // get the menu by id
  async getMenu(args) {
    try {
      const id = args.id;
      return menuJson[id];
    } catch (error) {
      return error;
    }
  }
}

module.exports = MenuController;
