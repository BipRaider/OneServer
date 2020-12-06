const multer = require('multer');

const storage = require('../middleware/initMulter');
const upload = multer({ storage: storage });

const { authorize, validateIdQuery } = require('@middleware');
const ImageController = require('../controllers/ImageController');
const handlerMulter = require('../middleware/handlerMulter');
const handlerImageMin = require('../middleware/handlerImageMin');

//CRUD
const imageList = [
   {
      app: 'post',
      urn: '/form-data',
      middleware: [upload.single('avatar'), handlerImageMin, handlerMulter],
   },
   {
      app: 'post',
      urn: '/form-data',
      middleware: [handlerMulter],
   },
];

module.exports = imageList;
