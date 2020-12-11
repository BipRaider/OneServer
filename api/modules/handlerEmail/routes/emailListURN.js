const EmailController = require('../controllers/EmailController');

//CRUD Email
const emailList = [
   {
      app: 'get',
      urn: '/:verificationToken',
      middleware: [EmailController.verifyUser],
   },
];

module.exports = emailList;
