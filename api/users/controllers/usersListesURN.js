const UserController = require('./UserController');
//CRUD
const userList = [
   {
      app: 'get',
      urn: '/',
      text: 'read users list',
      middleware: [UserController.getUsers],
   },
   {
      app: 'post',
      urn: '/',
      text: 'created new user',
      middleware: [UserController.validateCreateUser, UserController.createUser],
   },
   {
      app: 'put',
      urn: '/:id',
      text: 'update user',
      middleware: [UserController.updateUser],
   },
   {
      app: 'delete',
      urn: '/:id',
      text: 'delete user',
      middleware: [UserController.deleteUser],
   },
];

module.exports = userList;
