const EventEmitter = require("events");
const jsonwebtoken = require("jsonwebtoken");
const { TOKEN_KEY } = require("../config");

class SignUpManager extends EventEmitter {
  constructor() {
    super();
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
  }

  async signup(userData) {
    await this.generateToken(userData);
    this.emit("signup", userData);
  }

  async signin(userData) {
    await this.generateToken(userData);
    this.emit("signin", userData);
  }

  async generateToken(userData) {
    const token = jsonwebtoken.sign(
      {
        user_id: userData.id,
        email: userData.email,
      },
      TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    userData.token = token;
    userData.expiresIn = "2h";
  }
}

module.exports = SignUpManager;
