const path = require('path');
const fs = require('fs');
const { promises: fsPromises } = require('fs');
const Joi = require('joi');
// собираем путь до файла json
const pathToAsync = path.join(process.cwd(), '/api/users/db/users.json');
// читаем файл
const users = JSON.parse(fs.readFileSync(pathToAsync).toString());

class UserController {
   get createUser() {
      return this._createUser.bind(this);
   }
   get updateUser() {
      return this._updateUser.bind(this);
   }
   get deleteUser() {
      return this._deleteUser.bind(this);
   }

   //GET
   async getUsers(req, res, next) {
      try {
         return await res.json(users);
      } catch (error) {
         console.error(new Error('Users not found'));
         next(error);
      }
   }

   //POST
   async _createUser(req, res, next) {
      try {
         const newUser = await {
            ...req.body,
            id: users.length + 1,
         };
         // собираем массив с новым user
         await users.push(newUser);
         // преобразуем файл JSON формат
         const addUser = await JSON.stringify(users, null, 1);
         //Записываем нового юзера в file users.json
         await fsPromises.writeFile(pathToAsync, addUser);

         return await res.status(200).send('User created');
      } catch (error) {
         next(error);
      }
   }

   //PUT
   async _updateUser(req, res, next) {
      try {
         // вытаскиваем данные из  users/id
         const targetUserIndex = await this.findUserIndexByID(res, req.params.id);

         // if (targetUserIndex === undefined) return; // можно удалять так как у нас в findUserIndexByID  есть class для про верки NotFoundError

         users[targetUserIndex] = {
            ...users[targetUserIndex],
            ...req.body,
         };

         // преобразуем файл JSON формат
         const addUser = await JSON.stringify(users, null, 1);
         //Записываем нового юзера в file users.json
         await fsPromises.writeFile(pathToAsync, addUser);

         return await res.status(200).send('User update');
      } catch (error) {
         next(error);
      }

      //   // вытаскиваем данные из  users/id
      //   const targetUserIndex = this.findUserIndexByID(res, req.params.id);

      //   if (targetUserIndex === undefined) return;

      //   users[targetUserIndex] = {
      //      ...users[targetUserIndex],
      //      ...req.body,
      //   };

      //   fs.writeFileSync(pathToAsync, JSON.stringify(users, null, 1));

      //   return res.status(200).send('User update');
   }

   //DELETE
   async _deleteUser(req, res, next) {
      try {
         const targetUserIndex = await this.findUserIndexByID(res, req.params.id);
         // if (targetUserIndex === undefined) return; // можно удалять так как у нас в findUserIndexByID  есть class для про верки NotFoundError
         await users.splice(targetUserIndex, 1); // удаляем из объекта массив с пользователем  по index
         // преобразуем файл JSON формат
         const addUser = await JSON.stringify(users, null, 1);
         //Записываем нового юзера в file users.json
         await fsPromises.writeFile(pathToAsync, addUser);

         return await res.status(200).send('User update');
      } catch (error) {
         next(error);
      }
      //   const targetUserIndex = this.findUserIndexByID(res, req.params.id);

      //   if (targetUserIndex === undefined) return;

      //   users.splice(targetUserIndex, 1);

      //   fs.writeFileSync(pathToAsync, JSON.stringify(users, null, 1));
      //   return res.status(200).send('User delete');
   }

   findUserIndexByID(res, userID) {
      // вытаскиваем данные из  users?:id= и через parseInt приводим к числу
      const id = parseInt(userID);
      //Находим по id пользователя  и возвращаем id если нашли если нет то -1
      const targetUserIndex = users.findIndex(user => user.id === id);
      // если пользователь не найден выводим ошибку и статус код 404
      if (targetUserIndex === -1) {
         throw new NotFoundError('User not found...');
         // res.status(404).send('User does not exist');
         return;
      }
      return targetUserIndex;
   }

   validateCreateUser(req, res, next) {
      const userTemple = Joi.object({
         name: Joi.string().required(),
         email: Joi.string().required(),
         password: Joi.string().required(),
      });

      const validated = userTemple.validate(req.body);

      if (validated.error) {
         res.status(404).send(validated.error);
         return;
      }

      next();
   }

   validateUpdateUser(req, res, next) {
      const updateUserRules = Joi.object({
         name: Joi.string(),
         email: Joi.string(),
         password: Joi.string(),
      });

      const validated = updateUserRules.validate(req.body);

      if (validated.error) {
         res.status(404).send(validated.error);
         return;
      }

      next();
   }
}

// создаём класс для вывода ошибок и скрытия stackTheist error   в терминал консоль и браузере
//  и  теперь не требуется делать проверку на // if (targetUserIndex === undefined) return;
class NotFoundError extends Error {
   constructor(message) {
      super(message);

      this.status = 404;
      delete this.stack; // удаляем stackTheist error  чтобы не знали детали реализаций нашего сервера
   }
}

module.exports = new UserController();

// module.exports = class UserController {
//    static getUsers(req, res, next) {
//       return res.json(users);
//    }
//    static createUser(req, res, next) {
//       return res.json('User created');
//    }
// };
