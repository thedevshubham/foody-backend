const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
let userData = require("../data/users.json");
const userdataFile = path.join(__dirname, "../data") + "/users.json";

class UserController {
  constructor() {
    this.getUsers = this.getUsers.bind(this);
    this.addUser = this.addUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteuser = this.deleteuser.bind(this);
  }

  // get users list
  async getUsers() {
    try {
      const fileData = fs.readFileSync(
        userdataFile,
        "utf-8",
        (err, jsonString) => {
          if (err) {
            return err;
          }
          return jsonString.toString();
        }
      );
      return fileData && JSON.parse(fileData);
    } catch (error) {
      return error;
    }
  }

  // add a user
  async addUser(args) {
    try {
      let newUser = {
        id: uuid.v4(),
        firstName: args.firstName,
        lastName: args.lastName,
        phone: args.phone,
        email: args.email,
      };
      userData.push(newUser);
      fs.writeFileSync(userdataFile, JSON.stringify(userData), (err) => {
        if (err) return err;
      });
      return newUser;
    } catch (error) {
      return error;
    }
  }

  // update a user
  async updateUser(args) {
    try {
      let foundUser = {};
      let foundUserIndex = -1;
      for (let index = 0; index < userData.length; index++) {
        if (userData[index].id == args.id) {
          foundUser = { ...userData[index] };
          foundUserIndex = index;
          break;
        }
      }
      if (Object.keys(foundUser).length > 0) {
        foundUser = {
          ...foundUser,
          firstName: args.firstName,
          lastName: args.lastName,
          phone: args.phone,
          email: args.email,
        };
        userData[foundUserIndex] = foundUser;
        fs.writeFileSync(userdataFile, JSON.stringify(userData), (err) => {
          if (err) return err;
        });
        return userData;
      }
      throw new Error("no user found");
    } catch (error) {
      return error;
    }
  }

  // delete a user
  async deleteuser(args) {
    try {
      if (args.deleteAll) {
        userData = [];
      } else {
        userData = userData.filter((item) => {
          return item.id != args.id;
        });
      }
      fs.writeFileSync(userdataFile, JSON.stringify(userData), (err) => {
        if (err) return err;
      });
      return userData;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserController;
