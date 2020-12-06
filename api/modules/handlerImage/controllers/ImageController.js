class ImageController {
   get getImage() {
      return this._getImage.bind(this);
   }
   get getAvatar() {
      return this._getAvatar.bind(this);
   }

   //GET /auth/images/ name images
   async _getImage(req, res, next) {
      try {
         const { filename } = await req.file;

         return res.status(200).send(`http://localhost:3000/auth/images/${filename}`);
      } catch (error) {
         next(error);
      }
   }
   async _getAvatar(req, res, next) {}
}

module.exports = new ImageController();
