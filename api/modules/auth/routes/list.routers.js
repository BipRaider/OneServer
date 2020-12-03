const filmRouter = require('../../handlerFilm/routes/film.router');
const imageRouter = require('../../handlerImage/routes/image.router');
//CRUD
const listRouters = [
   {
      urn: '/films',
      router: filmRouter,
   },
   {
      urn: '/images',
      router: imageRouter,
   },
];

module.exports = listRouters;
