const { Router } = require('express');
const filmList = require('./filmListURN');

const filmRouter = Router();

filmList.map(({ app, urn, middleware }) => {
   filmRouter[app](urn, middleware);
});

filmRouter.use((err, req, res, next) => {
   console.log('Error >>>', err.message);
   return res.status(err.status).send({ message: err.message });
});

module.exports = {
   filmRouter,
};
