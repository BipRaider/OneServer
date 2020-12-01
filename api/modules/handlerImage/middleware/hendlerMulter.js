const multer = require('multer');
const upload = multer({ dest: 'static' });

async function hendlerMulter(req, res, next) {
   try {
      next();
   } catch (error) {
      next(error);
   }
}

module.exports = hendlerMulter;
