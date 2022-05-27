class EmailService {
  send(userData) {
    console.log(`Sending email to ${userData.email}`);
  }
}

module.exports = EmailService;
