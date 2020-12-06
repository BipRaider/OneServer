const path = require('path');
const multer = require('multer');

// создаст папку в корневой папке    настройки
const storage = multer.diskStorage({
   destination: process.cwd() + '/draft', // где хранится файл
   // присваиваем  имя файлу
   filename: function (req, file, cb) {
      const ext = path.parse(file.originalname).ext;
      cb(null, Date.now() + ext);
   },
});

// const upload = multer({ storage: storage }); // создаст папку в корневой папке
//upload.single('avatar')

module.exports = storage;
