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
      middleware: [ContactsController.getContactId],
   },

   {
      app: 'post',
      urn: '/',
      middleware: [ContactsController.validatePostContact, ContactsController.createContact],
   },
   {
      app: 'patch',
      urn: '/:contactId',
      middleware: [ContactsController.validateUpdateContact, ContactsController.updateContact],
   },
   {
      app: 'patch',
      urn: '/',
      middleware: [ContactsController.validateIdQuery],
   },
   {
      app: 'delete',
      urn: '/:contactId',
      middleware: [ContactsController.deleteContact],
   },
   {
      app: 'delete',
      urn: '/',
      middleware: [ContactsController.validateIdQuery],
   },
];

module.exports = contactsList;
