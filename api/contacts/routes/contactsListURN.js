const ContactsController = require('../controllers/ContactsController');
//CRUD
const contactsList = [
   {
      app: 'get',
      urn: '/',
      middleware: [ContactsController.getContact],
   },
   {
      app: 'get',
      urn: '/:contactId',
      middleware: [ContactsController.validateIdQuery, ContactsController.getContactId],
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
         ContactsController.validateIdQuery,
         ContactsController.validateUpdateContact,
         ContactsController.updateContact,
      ],
   },
   {
      app: 'delete',
      urn: '/:contactId',
      middleware: [ContactsController.validateIdQuery, ContactsController.deleteContact],
   },
];

module.exports = contactsList;
