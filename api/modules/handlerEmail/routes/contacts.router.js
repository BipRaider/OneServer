const { Router } = require('express');
const contactsList = require('./contactsListURN');
const listRouters = require('./list.routers');

const contactsRouter = Router();

//Adede contacts  url
contactsList.map(({ app, urn, middleware }) => {
   contactsRouter[app](urn, middleware);
});

//Added anything  routers
listRouters.map(({ urn, router }) => {
   contactsRouter.use(urn, router);
});
//return Error
contactsRouter.use((err, req, res, next) => {
   return res.status(err.status).send({ message: err.message });
});

module.exports = {
   contactsRouter,
};
