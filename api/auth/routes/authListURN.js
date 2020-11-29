const AuthController = require('../controllers/AuthController');
const { validateSingIn } = require('../middleware/validateSingIn');
const { validateIdQuery } = require('../../middleware/validateIdQuery');
const { authorize } = require('../../middleware/authorize');

//CRUD
const authList = [
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
      middleware: [authorize, AuthController.getCurrentContact],
   },
];

module.exports = authList;
