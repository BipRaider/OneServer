const { getFilmById, addFilmUser, removeFilmUser, aggregateFilmUser } = require('../models/index');

class FilmController {
   get addFilmForUser() {
      return this._addFilmForUser.bind(this);
   }
   get removeFilmForUser() {
      return this._removeFilmForUser.bind(this);
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
