const { Router } = require('express');
const contactsList = require('./contactsListURN');

const contactsRouter = Router();

contactsList.map(({ app, urn, middleware }) => {
   contactsRouter[app](urn, middleware);
});

module.exports = {
   contactsRouter,
};
