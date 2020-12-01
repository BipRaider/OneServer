const multer = require('multer');
const upload = multer({ dest: 'static' });

const ImageController = require('../controllers/ImageController');
const authorize = require('../../../middleware/authorize');
const validateIdQuery = require('../../../middleware/validateIdQuery');

//CRUD
const imageList = [
   {
      app: 'post',
      urn: '/form-data',
      middleware: [
         upload.single('avatar'),
         (req, res, next) => {
            console.log('post-avatar');
            res.send('post-avatar');
         },
      ],
   },
   {
      app: 'post',
      urn: '/',
      middleware: [
         authorize,
         (req, res, next) => {
            console.log('post-image');
            res.send('post-image');
         },
      ],
   },
   {
      app: 'delete',
      urn: '/',
      middleware: [
         authorize,
         (req, res, next) => {
            console.log('post-delete');
            res.send('post-delete');
         },
      ],
   },
];

module.exports = imageList;
