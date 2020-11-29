const { contactsRouter } = require('../contacts/routes/contacts.router');
const { authRouter } = require('../auth/routes/auth.router');
//CRUD
const listRouters = [
   {
      urn: '/contacts',
      router: contactsRouter,
   },
   {
      urn: '/auth',
      router: authRouter,
   },
];

module.exports = listRouters;
