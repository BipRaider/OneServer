const { Router } = require('express');

const { getApi } = require('../controllers/ApiController');
const listRouters = require('./list.routers');

const apiRouter = Router();

apiRouter.get('/', getApi);

listRouters.map(({ urn, router }) => {
   apiRouter.use(urn, router);
});

module.exports = {
   apiRouter,
};
