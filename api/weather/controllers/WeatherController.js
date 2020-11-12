const fetch = require('node-fetch');
const Joi = require('joi');

const WEATHER_URL = 'https://api.darksky.net/forecast/';
const { _DARK_KEY } = process.env;

class WeatherController {
   get getWeather() {
      return this._getWeather.bind(this);
   }
   //GET
   async _getWeather(req, res, next) {
      try {
         const { lat, lon } = await req.query;

         const weatherRes = await fetch(
            `${WEATHER_URL}${_DARK_KEY}/${lat},${lon}?exclude=hourly,daily,minutely`,
         );

         const responseBody = await weatherRes.json();
         if (responseBody.error) res.status(responseBody.code).send(responseBody.error);

         return res.status(200).send({ responseBody });
      } catch (error) {
         next(error);
      }
   }

   validationWeatherQuery(req, res, next) {
      if (req.query.lat === undefined || req.query.lon === undefined) return res.send();

      const weatherRules = Joi.object({
         lat: Joi.string().required(),
         lon: Joi.string().required(),
      });

      const validation = weatherRules.validate(req.query);

      if (validation.error) {
         res.status(400).send(validation.error);
         return;
      }
      next();
   }
}

module.exports = new WeatherController();
