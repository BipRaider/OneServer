const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
   to: 'thebipus@gmail.com', //сому
   from: 'bipusgo@gmail.com', // Use the email address or domain you verified above
   subject: 'Sending with Twilio SendGrid is Fun', //Имя письма  или Тема
   text: 'and easy to do anywhere, even with Node.js', /// Краткое содержание
   html: '<h1>and easy to do anywhere, even with Node.js</h1>', // Формат HTML файла с разметкой
};
//es5
async function sendMail() {
   try {
      const sendMail = await sgMail.send(msg);
      console.log(sendMail);
   } catch (error) {
      console.error(error);

      if (error.response) {
         console.error(error.response.body);
      }
   }
}
sendMail();

//ES6
// sgMail.send(msg).then(
//    () => {},
//    error => {
//       console.error(error);

//       if (error.response) {
//          console.error(error.response.body);
//       }
//    },
// );
// //ES8
// (async () => {
//    try {
//       await sgMail.send(msg);
//    } catch (error) {
//       console.error(error);

//       if (error.response) {
//          console.error(error.response.body);
//       }
//    }
// })();
