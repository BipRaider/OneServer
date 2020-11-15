const fetch = require('node-fetch');
const Joi = require('joi');

class WeatherController {
   get getWeather() {
      return this._getWeather.bind(this);
   }
   //GET
   async _getWeather(req, res, next) {
      try {
         const { lat, lon } = await req.query;
         const weatherRes = await this.fetchWeather(lat, lon);
         const responseBody = await weatherRes.json();

         if (responseBody.error) res.status(responseBody.code).send(responseBody.error);

         return await res.status(200).send({ responseBody });
      } catch (error) {
         next(error);
      }
   }

   async fetchWeather(lat, lon) {
      try {
         const WEATHER_URL = 'https://api.darksky.net/forecast/';
         const { _DARK_KEY } = await process.env;
         return await fetch(
            `${WEATHER_URL}${_DARK_KEY}/${lat},${lon}?exclude=hourly,daily,minutely`,
         );
      } catch (error) {
         throw error;
      }
   }

   validationWeatherQuery(req, res, next) {
      const weatherRules = Joi.object({
         lat: Joi.string().required(),
         lon: Joi.string().required(),
      });

      const validation = weatherRules.validate(req.query);

      if (validation.error) {
         res.status(400).send(validation.error.details[0].message);
         return;
      }
      next();
   }
}

module.exports = new WeatherController();
