const filmRouter = require('../../handlerFilm/routes/film.router');
const imageRouter = require('../../handlerImage/routes/image.router');
const emailRouter = require('../../handlerEmail/routes/email.router');
//CRUD
const listRouters = [
   {
      urn: '/films', //http://localhost:3000/auth/films/
      router: filmRouter,
   },
   {
      urn: '/images', //http://localhost:3000/auth/images/
      router: imageRouter,
   },
   {
      urn: '/verify', //http://localhost:3000/auth/verify/:verificationToken
      router: emailRouter,
   },
];

module.exports = listRouters;
