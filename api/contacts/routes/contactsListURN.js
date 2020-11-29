const ContactsController = require('../controllers/ContactsController');
const { validateIdQuery } = require('../../middleware/validateIdQuery');
const { authorize } = require('../../middleware/authorize');
//CRUD
const contactsList = [
   {
      app: 'get',
      urn: '/',
      middleware: [ContactsController.getContact],
   },
   {
      app: 'get',
      urn: '/current',
      middleware: [authorize, ContactsController.getCurrentContact],
   },
   {
      app: 'get',
      urn: '/:contactId',
      middleware: [validateIdQuery, ContactsController.getContactId],
   },

   {
      app: 'post',
      urn: '/',
      middleware: [ContactsController.validatePostContact, ContactsController.createContact],
   },
   {
      app: 'patch',
      urn: '/:contactId',
      middleware: [
         validateIdQuery,
         ContactsController.validateUpdateContact,
         ContactsController.updateContact,
      ],
   },
   {
      app: 'delete',
      urn: '/:contactId',
      middleware: [validateIdQuery, ContactsController.deleteContact],
   },
];

module.exports = contactsList;
