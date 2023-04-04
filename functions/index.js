/* eslint-disable max-len */
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// // cloud funtions are deployed with the command: firebase deploy --only functions

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// The Firebase Admin SDK to access the Firebase Admin SDK
admin.initializeApp();

// Create a transporter object to send emails
// Use this command to set the secret as env variable in firebase
// firebase functions:config:set gmail.email="your-gmail-account@gmail.com" gmail.password="your-gmail-password"
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// this function is called when a new user is created, it sends an email to the user and sets a custom claim for user access control
exports.sendEmailAndSetCustomClaim = functions.auth.user().onCreate(async (user) => {
  // Get the user's email address
  const { email } = user;

  // Set the custom claim based on the email address
  const roles = ["user"];
  if (email === functions.config().gmail.email) {
    roles.push("admin");
  }

  // Update the user's custom claims
  await admin.auth().setCustomUserClaims(user.uid, { appRoles: roles });

  // Get the email details from the user's data
  const { displayName, photoURL } = user;
  const to = email;
  const subject = "Bienvenido a CondoHUB";
  const text = `Hola ${
    displayName || "!"
  },\n\nGracias por registrarte en CondoHUB, la mejor aplicación para conectar tu condominio!`;

  // Set up the email options
  const mailOptions = {
    from: functions.config().gmail.email,
    to,
    subject,
    text,
  };

  // Send the email
  return transporter
    .sendMail(mailOptions)
    .then(() => {
      console.log(
        `New user with rols: user: ${customClaims.user}, admin: ${customClaims.admin} created, email sent to ${to}`
      );
      return null;
    })
    .catch((error) => {
      console.error(`Error sending email to ${to}: ${error}`);
      return null;
    });
});
