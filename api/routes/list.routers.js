// const { contactsRouter } = require('@contactRouter');
// const { authRouter } = require('@authRouter');
const { contactsRouter } = require('../modules/contacts/routes/contacts.router');
const { authRouter } = require('../modules/auth/routes/auth.router');
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
