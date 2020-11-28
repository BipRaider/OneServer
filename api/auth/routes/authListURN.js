const AuthController = require('../controllers/AuthController');
const { validateSingIn } = require('../middleware/validateSingIn');
const { validateSingOut } = require('../middleware/validateSingOut');
//CRUD
const authList = [
   {
      app: 'put',
      urn: '/sign-in',
      middleware: [validateSingIn, AuthController.signIn],
   },
   // {
   //    app: 'patch',
   //    urn: '/:userId',
   //    middleware: [
   //       validateIdQuery,
   //       AuthController.validateUpdateContact,
   //       AuthController.updateContact,
   //    ],
   // },
];

module.exports = authList;
