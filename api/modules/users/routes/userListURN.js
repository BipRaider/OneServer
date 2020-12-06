const multer = require('multer');

const { authorize, validateIdQuery } = require('@middleware');
const UserController = require('../controllers/UserController');

const handlerImageMin = require('../../handlerImage/middleware/handlerImageMin');
const storage = require('../../handlerImage/middleware/initMulter');
const upload = multer({ storage: storage });

//CRUD
//http://localhost:3000/user
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
   {
      app: 'patch',
      urn: '/:contactId/avatar',
      middleware: [
         validateIdQuery,
         authorize,
         upload.single('avatar'),
         handlerImageMin,
         UserController.updateUser,
      ],
   },
];

module.exports = userList;
