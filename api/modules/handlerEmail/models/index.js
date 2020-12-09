require('dotenv').config();
const { MY_PASS_MAIL, MY_MAIL } = process.env;

const { userModule } = require('@data');
const { UnauthorizedError, hash } = require('@helpers');
const { hashPassword } = hash;

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

async function updateContact(contactID, newDate) {
   try {
      const updateID = await contactModule.findUserByIdAndUpdate(contactID, newDate);
      if (!updateID) {
         throw new UnauthorizedError('Not found', 404);
      }
      return updateID;
   } catch (error) {
      throw error;
   }
}

async function sendMail() {
   try {
      transporter.sendMail(mailOptions);
   } catch (error) {
      throw error;
   }
}

async function sendVerificationEmail(user) {
   try {
      const verificationToken = uuid.v5();

      const updateId = await contactModule.createVerificationToken(user._id, verificationToken);
      if (!updateID) {
         throw new UnauthorizedError('Not found', 404);
      }

      return updateId;
   } catch (error) {
      throw error;
   }
}
module.exports = { sendMail };
