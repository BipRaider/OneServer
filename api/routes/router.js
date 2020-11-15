const { Router } = require('express');
const listRouters = require('./list.routers');

const apiRouter = Router();

listRouters.map(({ urn, router }) => {
   apiRouter.use(urn, router);
});

module.exports = {
   apiRouter,
};
