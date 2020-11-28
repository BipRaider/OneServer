const { Router } = require('express');
const authList = require('./authListURN');

const authRouter = Router();

authList.map(({ app, urn, middleware }) => {
   authRouter[app](urn, middleware);
});

module.exports = {
   authRouter,
};
