const { Router } = require('express');
const userList = require('../controllers/usersListesURN');
const UserController = require('../controllers/UserController');

//Ендпоинт (англ. Endpoint) - это, по-факту, уникальная для вашего сервера комбинация URI i HTTP метода
const userRouter = Router(); // нужен для разбивания логики  маршрутов

userList.map(({ app, urn, middleware }) => {
   userRouter[app](urn, middleware);
});

module.exports = {
   userRouter,
};

// const UserController = require('../controllers/UserController');
// userRouter.get('/', UserController.getUsers);
// userRouter.post('/', UserController.validateCreateUser, UserController.createUser);
// userRouter.put('/:id', UserController.validateUpdateUser, UserController.updateUser);
// userRouter.delete('/:id', UserController.deleteUser);
//
