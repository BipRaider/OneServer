const { Router } = require('express');
const imageList = require('./imageListURN');

const imageRouter = Router();

imageList.map(({ app, urn, middleware }) => {
   imageRouter[app](urn, middleware);
});

imageRouter.use((err, req, res, next) => {
   console.log('Error >>>', err.message);
   return res.status(err.status).send({ message: err.message });
});

module.exports = {
   imageRouter,
};
