const { filmRouter } = require('../../film/routes/film.router');
//CRUD
const listRouters = [
   {
      urn: '/films',
      router: filmRouter,
   },
];

module.exports = listRouters;
