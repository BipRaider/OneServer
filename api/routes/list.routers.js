const { contactsRouter } = require('../contacts/routes/contacts.router');
//CRUD
const listRouters = [
   {
      urn: '/contacts',
      router: contactsRouter,
   },
];

module.exports = listRouters;
