const {
   getImageById,
   addImageUser,
   removeImageUser,
   aggregateImageUser,
   getImages,
} = require('../models/index');

class ImageController {
   get getAllImage() {
      return this._getAllImage.bind(this);
   }
   get getAllImages() {
      return this._getAllImages.bind(this);
   }
   get addImageForUser() {
      return this._addImageForUser.bind(this);
   }
   get removeImageForUser() {
      return this._removeImageForUser.bind(this);
   }

   //GET /auth/Images
   async _getAllImages(req, res, next) {
      try {
         return await res.status(200);
      } catch (error) {
         next(error);
      }
   }
   //GET /auth/Images/:id
   async _getAllImage(req, res, next) {
      try {
         return await res.status(200);
      } catch (error) {
         next(error);
      }
   }

   //PUT /auth/Images/favorites/:id_Image
   async _addImageForUser(req, res, next) {
      try {
         return await res.status(200);
      } catch (error) {
         next(error);
      }
   }

   //DELETE /auth/Images/favorites/:id_Image
   async _removeImageForUser(req, res, next) {
      try {
         return await res.status(200);
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new ImageController();
