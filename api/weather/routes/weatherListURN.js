const WeatherController = require('../controllers/WeatherController');
//CRUD
const weatherList = [
   {
      app: 'get',
      urn: '/',
      text: 'read weather',
      middleware: [WeatherController.validationWeatherQuery, WeatherController.getWeather],
   },
];

module.exports = weatherList;
