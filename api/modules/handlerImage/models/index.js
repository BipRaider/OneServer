const { UnauthorizedError } = require('@helpers');
const { userModule, imageModule } = require('@data');

async function getImages(page, list) {
   try {
      const images = await imageModule
         .find()
         .sort({ name: 1 })
         .skip(Number(page) || 1)
         .limit(Number(list) || 6);

      return images;
   } catch (error) {
      throw error;
   }
}

async function getImageById(id) {
   try {
      const foundID = await imageModule.findById(id);

      if (!foundID) {
         throw new UnauthorizedError('Image does not found ', 404);
      }

      return foundID;
   } catch (error) {
      throw error;
   }
}

async function addImageUser(userId, imageId) {
   try {
      await userModule.findByIdAndUpdate(
         userId,
         {
            $push: { favoriteImageIds: imageId },
         },
         { new: true },
      );
   } catch (error) {
      throw error;
   }
}
async function removeImageUser(userId, imageId) {
   try {
      return await userModule
         .findByIdAndUpdate(
            userId,
            {
               $pull: { favoriteImageIds: imageId },
            },
            { new: true },
         )
         .populate('favoriteImageIds');
   } catch (error) {
      throw error;
   }
}
async function aggregateImageUser(userID, nameDB, localName, foreignName) {
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
               from: nameDB || 'image',
               //поле в коллекции пользователей, которое содержит id любимых фильмов
               //значения должно совпасть с foreignField
               localField: localName || 'favoriteImageIds',
               // поле в коллекции фильмов, которое должно отвечать id фильмов в
               // коллекции пользователей
               foreignField: foreignName || '_id', //значения должно совпасть с localField
               // как поле с документами фильмов будет называться
               as: nameDB || 'image', //в какое поле записывать найденные данные

               //Смотри в from > Смотри в строку localField >foreignField: сравнивай данные из  from  в localField по _id > as: совпадения вернуть в такую строку
            },
         },
         {
            //исключаем из данную старку из результата поиска
            $unset: ['favoriteImageIds'],
         },
      ]);
   } catch (error) {
      throw error;
   }
}

module.exports = {
   getImageById,
   addImageUser,
   removeImageUser,
   aggregateImageUser,
   getImages,
};
