const { updateUser } = require('../models');
const { updateUserToken } = require('@token');

class UserController {
   get logout() {
      return this._logout.bind(this);
   }
   get getUserAvatar() {
      return this._getUserAvatar.bind(this);
   }
   get updateUser() {
      return this._updateUser.bind(this);
   }
   //PATCH /user/:contactId/logout
   async _logout(req, res, next) {
      try {
         const user = req.user;
         await updateUserToken(user._id, null);
         return await res.status(204);
      } catch (error) {
         next(error);
      }
   }

   //GET /user/avatar
   async _getUserAvatar(req, res, next) {
      try {
         return res.status(200).send(req.user.avatarURL);
      } catch (error) {
         next(error);
      }
   }
   //PATCH /user/:contactId/avatar
   async _updateUser(req, res, next) {
      try {
         const { filename } = await req.file;
         const update = await updateUser(req.params.contactId, {
            avatarURL: `http://localhost:3000/auth/images/${filename}`,
         });

         const userForResponse = this.prepareUserResponse(update);

         return await res.status(200).json(userForResponse);
      } catch (error) {
         next(error);
      }
   }

   prepareUserResponse(user) {
      const { avatarURL } = user;
      return { avatarURL };
   }
}

module.exports = new UserController();
