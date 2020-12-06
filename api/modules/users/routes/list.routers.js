const filmRouter = require('../../handlerFilm/routes/film.router');
const imageRouter = require('../../handlerImage/routes/image.router');
//CRUD
const listRouters = [
   {
      urn: '/films', //http://localhost:3000/user/films/
      router: filmRouter,
   },
   {
      urn: '/images', //http://localhost:3000/user/images/
      router: imageRouter,
   },
];

module.exports = listRouters;
