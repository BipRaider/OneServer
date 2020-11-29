const AuthController = require('../controllers/AuthController');
const { validateSingIn } = require('../middleware/validateSingIn');
const validateCreateUser = require('../middleware/validateCreateUser');
const { validateIdQuery } = require('../../middleware/validateIdQuery');
const { authorize } = require('../../middleware/authorize');

//CRUD
const authList = [
   {
      app: 'post',
      urn: '/register',
      middleware: [validateCreateUser, AuthController.createUser],
   },
   {
      app: 'put',
      urn: '/sign-in',
      middleware: [validateSingIn, AuthController.signIn],
   },
   {
      app: 'patch',
      urn: '/:contactId/logout',
      middleware: [validateIdQuery, authorize, AuthController.logout],
   },
   {
      app: 'get',
      urn: '/current',
      middleware: [authorize, AuthController.getCurrentUser],
   },
];

module.exports = authList;
