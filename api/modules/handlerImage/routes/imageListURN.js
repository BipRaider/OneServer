const multer = require('multer');

const ImageController = require('../controllers/ImageController');

const handlerImageMin = require('../middleware/handlerImageMin');
const storage = require('../middleware/initMulter');
const upload = multer({ storage: storage });

//http://localhost:3000/auth/images/

//CRUD
const imageList = [
   {
      app: 'post',
      urn: '/form-data',
      middleware: [upload.single('avatar'), handlerImageMin, ImageController.getImage],
   },
];

module.exports = imageList;
