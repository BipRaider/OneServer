const { Router } = require('express');
const authList = require('./authListURN');
const listRouters = require('./list.routers');

const authRouter = Router();

authList.map(({ app, urn, middleware }) => {
   authRouter[app](urn, middleware);
});

//Added anything  routers
listRouters.map(({ urn, router }) => {
   authRouter.use(urn, router);
});

//return Error
authRouter.use((err, req, res, next) => {
   console.log('Error >>>', err.message);
   return res.status(err.status).send({ message: err.message });
});

module.exports = {
   authRouter,
};
