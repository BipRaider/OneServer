const nodemailer = require('nodemailer');
require('dotenv').config();

const { sendMail } = require('../models/index');

class EmailController {
   get getContactId() {
      return this._getContactId.bind(this);
   }
   //GET /api/contacts
   async _getContact(req, res, next) {
      try {
         const contacts_db = await getContacts();
         return await res.json(this.prepareContactsResponse(contacts_db));
      } catch (error) {
         next(error);
      }
   }

   async sendMail(req, res, next) {
      try {
         await sendMail();
         return await res.send('send mail ');
      } catch (error) {
         next(error);
      }
   }
   async sendVerificationEmail(user) {}
}

module.exports = new EmailController();
