const nodemailer = require('nodemailer');
require('dotenv').config();

const { MY_PASS_MAIL, MY_MAIL } = process.env;

/**
 * @param  {'gmail'} service
 * @param  {{user:MY_MAIL} auth
 * @param  {MY_PASS_MAIL} pass

 */
// Указываем какой акаунты используем
const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: MY_MAIL,
      pass: MY_PASS_MAIL,
   },
});

// параметры мыла сообщения
const mailOptions = {
   from: MY_MAIL, //  The sender of the email
   to: ['thebipus@gmail.com', MY_MAIL], // The recipient of the email
   subject: 'Subject of your email', //  the subject of the email
   html: '<p>Your html here</p>', //  all the magic happens here
};

transporter.sendMail(mailOptions, function (err, info) {
   if (err) console.log(err);
   else console.log(info);
});

async function SendMail() {
   try {
      const sendMail = transporter.sendMail(mailOptions);
      console.log('message', sendMail);
   } catch (error) {}
}
