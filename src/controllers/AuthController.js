const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
let userData = require("../data/users.json");
const userdataFile = path.join(__dirname, "../data") + "/users.json";
const { signUpManager } = require("../subscribers");

class AuthController {
  constructor() {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  // add a user
  async signUp(args) {
    try {
      for (let index = 0; index < userData.length; index++) {
        if (userData[index].email == args.email) {
          throw new Error("user already exists with same email");
        }
      }
      let encryptedPassword = await bcrypt.hash(args.password, 10);
      let userId = uuid.v4();
      let newUser = {
        id: userId,
        firstName: args.firstName,
        lastName: args.lastName,
        phone: args.phone,
        email: args.email.toLowerCase(),
        password: encryptedPassword,
      };
      userData.push(newUser);
      fs.writeFileSync(userdataFile, JSON.stringify(userData), (err) => {
        if (err) return err;
      });
      signUpManager.signup(newUser);
      return {
        ...newUser,
        password: undefined,
      };
    } catch (error) {
      return error;
    }
  }

  // update a user
  async signIn(args) {
    try {
      let foundUser = {};
      let foundUserIndex = -1;
      for (let index = 0; index < userData.length; index++) {
        if (userData[index].email == args.email) {
          foundUser = { ...userData[index] };
          foundUserIndex = index;
          break;
        }
      }
      if (
        Object.keys(foundUser).length > 0 &&
        (await bcrypt.compare(args.password, foundUser.password))
      ) {
        signUpManager.signin(foundUser);
        return {
          ...foundUser,
          password: undefined,
        };
      }
      throw new Error("no user found");
    } catch (error) {
      return error;
    }
  }
}

module.exports = AuthController;
