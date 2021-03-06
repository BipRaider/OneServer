const { getEmail, validPassword, createNewUser } = require('../models/index');
const { updateUserToken } = require('@token');

class AuthController {
   get createUser() {
      return this._createUser.bind(this);
   }
   get signIn() {
      return this._signIn.bind(this);
   }
   get logout() {
      return this._logout.bind(this);
   }
   get getCurrentUser() {
      return this._getCurrentUser.bind(this);
   }

   //POST /auth/contacts
   async _createUser(req, res, next) {
      try {
         const newUser = await createNewUser(req.body);
         return await res.status(201).json(newUser);
      } catch (error) {
         next(error);
      }
   }

   //PUT /auth/sign-in
   async _signIn(req, res, next) {
      try {
         const { email, password } = req.body;

         const userFromDb = await getEmail(email);

         await validPassword(password, userFromDb);

         const token = await updateUserToken(userFromDb._id);

         return res.status(201).json({ token });
      } catch (error) {
         next(error);
      }
   }

   //PATCH /auth/:contactId/logout
   async _logout(req, res, next) {
      try {
         const user = req.user;
         await updateUserToken(user._id, null);
         return await res.status(204);
      } catch (error) {
         next(error);
      }
   }

   //GET /auth/current
   async _getCurrentUser(req, res, next) {
      try {
         const userForResponse = this.prepareUserResponse(req.user);
         return res.status(200).json(userForResponse);
      } catch (error) {
         next(error);
      }
   }

   prepareUserResponse(user) {
      const { email, subscription } = user;
      return { email, subscription };
   }
}

module.exports = new AuthController();
