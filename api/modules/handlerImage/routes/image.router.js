const express = require('express');
const { Router } = require('express');

const imageList = require('./imageListURN');

const imageRouter = Router();

imageList.map(({ app, urn, middleware }) => {
   imageRouter[app](urn, middleware);
});

imageRouter.use(express.static('static')); //http://localhost:3000/auth/images/1607171318794.jpg

imageRouter.use((err, req, res, next) => {
   console.log('Error >>>', err.message);
   return res.status(err.status).send({ message: err.message });
});

module.exports = imageRouter;
