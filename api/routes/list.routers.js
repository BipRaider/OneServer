const { userRouter } = require('../users/routes/users.router');
const { weatherRouter } = require('../weather/routes/weather.router');
const { contactsRouter } = require('../contacts/routes/contacts.router');
//CRUD
const listRouters = [
   {
      urn: '/users',
      router: userRouter,
   },
   {
      urn: '/weather',
      router: weatherRouter,
   },
   {
      urn: '/contacts',
      router: contactsRouter,
   },
];

module.exports = listRouters;
