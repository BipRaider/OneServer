const multer = require('multer');
// const handlerImageMin = require('../../handlerImage/middleware/handlerImageMin');
// const storage = require('../../handlerImage/middleware/initMulter');
// const upload = multer({ storage: storage });

const { authorize, validateIdQuery } = require('@middleware');
const UserController = require('../controllers/UserController');

//CRUD
const userList = [
   {
      app: 'patch',
      urn: '/:contactId/logout',
      middleware: [validateIdQuery, authorize, UserController.logout],
   },
   {
      app: 'get',
      urn: '/avatar',
      middleware: [authorize, UserController.getUserAvatar],
   },
];

module.exports = userList;
