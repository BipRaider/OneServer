const { getEmail, validPassword } = require('../models/index');
const { updateContactToken } = require('../../token/index');

class AuthController {
   get signIn() {
      return this._signIn.bind(this);
   }

   get logout() {
      return this._logout.bind(this);
   }

   get getCurrentContact() {
      return this._getCurrentContact.bind(this);
   }
   //PUT /api/sign-in
   async _signIn(req, res, next) {
      try {
         const { email, password } = req.body;

         const contactFromDb = await getEmail(email);

         await validPassword(password, contactFromDb);

         const token = await updateContactToken(contactFromDb._id);

         return res.status(200).json({ token });
      } catch (error) {
         next(error);
      }
   }

   //PATCH /api/:contactId/logout
   async _logout(req, res, next) {
      try {
         const user = req.user;
         await updateContactToken(user._id, null);
         return await res.status(204).send({ message: 'logout contact....' });
      } catch (error) {
         next(error);
      }
   }

   //GET /api/current
   async _getCurrentContact(req, res, next) {
      try {
         const [userForResponse] = this.prepareContactsResponse([req.user]);
         return res.status(200).json(userForResponse);
      } catch (error) {
         next(error);
      }
   }

   prepareContactsResponse(contacts) {
      return contacts.map(data => {
         return this.prepareContactResponse(data);
      });
   }
   prepareContactResponse(contact) {
      const { name, email, phone, _id } = contact;
      return { id: _id, name, email, phone };
   }
}

module.exports = new AuthController();
