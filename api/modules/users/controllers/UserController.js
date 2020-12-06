const { updateUserToken } = require('@token');

class UserController {
   get logout() {
      return this._logout.bind(this);
   }
   get getUserAvatar() {
      return this._getUserAvatar.bind(this);
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
}

module.exports = new UserController();
