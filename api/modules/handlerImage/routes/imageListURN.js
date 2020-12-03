const multer = require('multer');
const upload = multer({ dest: __dirname + '/static' });

const { authorize, validateIdQuery } = require('@middleware');

const ImageController = require('../controllers/ImageController');
const handlerMulter = require('../middleware/handlerMulter');
const initMulter = require('../middleware/initMulter');

//CRUD
const imageList = [
   {
      app: 'post',
      urn: '/form-data',
      middleware: [upload.single('avatar'), handlerMulter],
   },
];

module.exports = imageList;
