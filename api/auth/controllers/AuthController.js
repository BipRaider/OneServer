const { getEmail, validPassword, updateContactToken } = require('../models/index');

class AuthController {
   get signIn() {
      return this._signIn.bind(this);
   }

   get updateUser() {
      return this._updateContact.bind(this);
   }

   //PUT
   async _signIn(req, res, next) {
      try {
         const { email, password } = req.body;
         const contactFromDb = await getEmail(email);
         //
         const contactValid = await validPassword(password, contactFromDb.password);

         if (contactValid) {
            return res.status(401).send({ message: 'Authentication failed... ' });
         }
         //
         const token = await updateContactToken(contactFromDb._id);

         return res.status(200).json({ token });
      } catch (error) {
         res.status(401).send({ message: 'Authentication failed... ' });
         next(error);
      }
   }

   //PATCH
   async _updateUser(req, res, next) {
      try {
         const update = await updateContact(req.params.userId, req.body);
         return await res.status(200).json(update);
      } catch (error) {
         res.status(404).send({ message: 'Not logged out...' });
         next(error);
      }
   }
}

module.exports = new AuthController();
