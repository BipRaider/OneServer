const { Router } = require('express');

const { getApi } = require('../controllers/ApiController');
const listRouters = require('./list.routers');

const apiRouter = Router();

apiRouter.get('/', getApi);

listRouters.map(({ urn, router }) => {
   apiRouter.use(urn, router);
});

apiRouter.use((err, req, res, next) => {
   console.dir(err);
   return res.status(404).send('404');
});

class NotFoundError extends Error {
   constructor(message) {
      super(message);
      this.status = 404;
      delete this.stack;
   }
}

module.exports = {
   apiRouter,
};
