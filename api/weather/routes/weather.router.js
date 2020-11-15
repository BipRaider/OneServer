const { Router } = require('express');
const weatherList = require('./weatherListURN');

//Ендпоинт (англ. Endpoint) - это, по-факту, уникальная для вашего сервера комбинация URI i HTTP метода
const weatherRouter = Router(); // нужен для разбивания логики  маршрутов

weatherList.map(({ app, urn, middleware }) => {
   weatherRouter[app](urn, middleware);
});

module.exports = {
   weatherRouter,
};
