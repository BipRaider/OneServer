const WeatherController = require('../controllers/WeatherController');
//CRUD
const weatherList = [
   {
      app: 'get',
      urn: '/',
      text: 'read weather',
      middleware: [WeatherController.validationWeatherQuery, WeatherController.getWeather],
   },
   {
      app: 'post',
      urn: '/',
      text: 'read weather',
      middleware: [WeatherController.validationWeatherQuery],
   },
];

module.exports = weatherList;
