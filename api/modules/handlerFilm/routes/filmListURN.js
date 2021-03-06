const FilmController = require('../controllers/FilmController');
const authorize = require('../../../middleware/authorize');
const validateIdQuery = require('../../../middleware/validateIdQuery');

//CRUD
const filmList = [
   {
      app: 'get',
      urn: '/',
      middleware: [FilmController.getAllFilms],
   },
   {
      app: 'get',
      urn: '/:contactId',
      middleware: [validateIdQuery, FilmController.getAllFilm],
   },
   {
      app: 'put',
      urn: '/favorites/:contactId',
      middleware: [authorize, validateIdQuery, FilmController.addFilmForUser],
   },
   {
      app: 'delete',
      urn: '/favorites/:contactId',
      middleware: [authorize, validateIdQuery, FilmController.removeFilmForUser],
   },
];

module.exports = filmList;
