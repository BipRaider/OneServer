const { Router } = require('express');
const userList = require('./userListURN');
const listRouters = require('./list.routers');

const userRouter = Router();

userList.map(({ app, urn, middleware }) => {
   userRouter[app](urn, middleware);
});

//Added anything  routers
listRouters.map(({ urn, router }) => {
   userRouter.use(urn, router);
});

//return Error
userRouter.use((err, req, res, next) => {
   console.log('Error >>>', err.message);
   return res.status(err.status).send({ message: err.message });
});

module.exports = userRouter;
