require('dotenv').config()
const nodemailer = require("nodemailer");

async function sendEmail(userEmail) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Admin" <admin@book-management.com>',
    to: userEmail, // list of receivers
    subject: "Wrong Login Over 3 times", // Subject line
    text:
      "Your account was locked because you logged in wrong over 3 times. Please contact to admin to unlock your account."
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
