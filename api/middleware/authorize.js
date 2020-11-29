const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = process.env;

const { contactModule } = require('../data/contactSchema');
const { UnauthorizedError } = require('../helpers/errors.constructor');

async function authorize(req, res, next) {
   try {
      // 1. достать токен пользователя с заголовка Authorization
      const authorizationHeader = req.get('Authorization');
      const token = authorizationHeader.replace('Bearer ', ''); // убрали слово Bearer  и получили чистый токен
      // 2. достать id пользователя с пейлоада или вернуть пользователю
      // ошибку со статус кодом 401
      let userId;
      try {
         userId = await jwt.verify(token, JWT_SECRET).id;
      } catch (err) {
         next(new UnauthorizedError('User not authorized', 401));
      }

      // 3. достать соответствующего пользователя. Если такого нет - вернуть
      // ошибку со статус кодом 401
      // userModel - модель пользователя в нашей системе
      const user = await contactModule.findById(userId);
      if (!user || user.token !== token) {
         throw new UnauthorizedError('User not found', 401);
      }

      // 4. Если все прошло успешно - передать запись пользователя и токен в req
      // и передать обработку запроса на следующий middleware
      req.user = user;
      req.token = token;

      next();
   } catch (err) {
      next(err);
   }
}

module.exports = {
   authorize,
};
