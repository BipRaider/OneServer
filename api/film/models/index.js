const { UnauthorizedError } = require('../../helpers/errors.constructor');

const { userModule } = require('../../data/userSchema');
const filmModule = require('../../data/filmSchema');

async function getFilmById(id) {
   try {
      const foundID = await filmModule.findById(id);

      if (!foundID) {
         throw new UnauthorizedError('film does not found ', 404);
      }

      return foundID;
   } catch (error) {
      throw error;
   }
}
async function addFilmUser(userId, filmId) {
   try {
      await userModule.findByIdAndUpdate(
         userId,
         {
            $push: { favoriteFilmIds: filmId },
         },
         { new: true },
      );
   } catch (error) {
      throw error;
   }
}
async function removeFilmUser(userId, filmId) {
   try {
      await userModule.findByIdAndUpdate(
         userId,
         {
            $pull: { favoriteFilmIds: filmId },
         },
         { new: true },
      );
   } catch (error) {
      throw error;
   }
}
async function aggregateFilmUser(userID, nameDB, localName, foreignName) {
   try {
      //применяется для соединения данных с разных коллекций
      return await userModule.aggregate([
         {
            //Делает проверку по пользователю и возврат результатов только из его данных
            $match: { _id: userID },
         },
         {
            $lookup: {
               // указываем где искать в какой ДБ ,название коллекцию, а не модели!!!!
               from: nameDB || 'films',
               //поле в коллекции пользователей, которое содержит id любимых фильмов
               //значения должно совпасть с foreignField
               localField: localName || 'favoriteFilmIds',
               // поле в коллекции фильмов, которое должно отвечать id фильмов в
               // коллекции пользователей
               foreignField: foreignName || '_id', //значения должно совпасть с localField
               // как поле с документами фильмов будет называться
               as: nameDB || 'films', //в какое поле записывать найденные данные

               //Смотри в from > Смотри в строку localField >foreignField: сравнивай данные из  from  в localField по _id > as: совпадения вернуть в такую строку
            },
         },
         {
            //исключаем из данную старку из результата поиска
            $unset: ['favoriteFilmIds'],
         },
      ]);
   } catch (error) {
      throw error;
   }
}

module.exports = {
   getFilmById,
   addFilmUser,
   removeFilmUser,
   aggregateFilmUser,
};
