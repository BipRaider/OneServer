const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
   destination: process.cwd() + '/tmp',

   filename: function (req, file, cb) {
      console.log('file', req, file);
      const ext = path.parse(file.originalname).ext;
      cb(null, Date.now() + ext);
   },
});

module.exports = storage;
