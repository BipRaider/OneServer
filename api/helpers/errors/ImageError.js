class ImageError extends Error {
   constructor(message, status) {
      super(message, status);
      this.message = message;
      this.status = status;
      delete this.stack;
   }
}
module.exports = ImageError;
