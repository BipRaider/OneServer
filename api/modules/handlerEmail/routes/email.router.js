const { Router } = require('express');
const emailList = require('./emailListURN');
const listRouters = require('./list.routers');

const emailRouter = Router();

//Adede email  url
emailList.map(({ app, urn, middleware }) => {
   emailRouter[app](urn, middleware);
});

//Added anything  routers
listRouters.map(({ urn, router }) => {
   emailRouter.use(urn, router);
});
//return Error
emailRouter.use((err, req, res, next) => {
   return res.status(err.status).send({ message: err.message });
});

module.exports = emailRouter;
