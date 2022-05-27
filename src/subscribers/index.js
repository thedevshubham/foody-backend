const SignUpManager = require("./signUpManager");
const EmailService = require("./emailService");
const AuthService = require("./authService");

const signUpManager = new SignUpManager();
const emailService = new EmailService();
const authService = new AuthService();

signUpManager.on("signup", (userData) => {
  emailService.send(userData);
  authService.generateToken(userData);
});

signUpManager.on("signin", (userData) => {
  userData.checkTheToken = "hello world!"
  authService.generateToken(userData);
});

module.exports = {
  signUpManager,
  emailService,
  authService,
};
