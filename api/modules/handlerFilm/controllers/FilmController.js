const {
   getFilmById,
   addFilmUser,
   removeFilmUser,
   aggregateFilmUser,
   getFilms,
} = require('../models/index');

class FilmController {
   get getAllFilm() {
      return this._getAllFilm.bind(this);
   }
   get getAllFilms() {
      return this._getAllFilms.bind(this);
   }
   get addFilmForUser() {
      return this._addFilmForUser.bind(this);
   }
   get removeFilmForUser() {
      return this._removeFilmForUser.bind(this);
   }

   //GET /auth/films
   async _getAllFilms(req, res, next) {
      try {
         const { page, list } = await req.query;

         const films = await getFilms(page, list);

         return await res.status(200).json(films);
      } catch (error) {
         next(error);
      }
   }
   //GET /auth/films/:id
   async _getAllFilm(req, res, next) {
      try {
         const filmID = req.params.contactId;
         const film = await getFilmById(filmID);

         return await res.status(200).json(film);
      } catch (error) {
         next(error);
      }
   }

   //PUT /auth/films/favorites/:id_film
   async _addFilmForUser(req, res, next) {
      try {
         const filmId = req.params.contactId;
         const userID = req.user._id;

         await getFilmById(filmId);

         await addFilmUser(userID, filmId);

         return await res.status(200).send('Added film...');
      } catch (error) {
         next(error);
      }
   }

   //DELETE /auth/films/favorites/:id_film
   async _removeFilmForUser(req, res, next) {
      try {
         const filmId = req.params.contactId;
         const userID = req.user._id;

         await removeFilmUser(userID, filmId);

         const userWithFilm = await aggregateFilmUser(userID);
         //return await res.status(200).send(this.prepareContactResponse(removeFilmUser)); //более дорогая операция и нельзя задавать точные параметры
         return await res.status(200).send(this.prepareContactsResponse(userWithFilm));
      } catch (error) {
         next(error);
      }
   }

   prepareContactsResponse(film) {
      return film.map(data => {
         return this.prepareContactResponse(data);
      });
   }
   prepareContactResponse(film) {
      const { _id, name, email, films, favoriteFilmIds } = film;
      return { id: _id, name, email, films, favoriteFilmIds };
   }
}

module.exports = new FilmController();
