const filmRouter = require('../../handlerFilm/routes/film.router');
//CRUD
const listRouters = [
   {
      urn: '/films',
      router: filmRouter,
   },
];

module.exports = listRouters;
