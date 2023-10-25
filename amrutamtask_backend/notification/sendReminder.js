const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');


const SendEmail = (to_name, to_email, message, from_email, user_password) => {

   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: from_email,
         pass: user_password,
      },
   });

   const mailOptions = {
      from: from_email,
      to: to_email,
      subject: `Hello ${to_name || 'Khateeb'}, you have a message`,
      text: message || 'This is a reminder',
   };

   transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
         console.log(err);
      } else {
         console.log('Email sent!');
      }
   });
}


module.exports = SendEmail;