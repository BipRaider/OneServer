//https://powerful-springs-97618.herokuapp.com/weather?lat=7.59&lon=8.56
const fetch = require('node-fetch');
const express = require('express');
const Joi = require('joi');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const WEATHER = '/weather';
const WEATHER_URL = 'https://api.darksky.net/forecast/';
const { _DARK_KEY } = process.env;
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
   cors({
      origin: `http://localhost:${PORT}`,
   }),
);

app.get(WEATHER, validationWeatherQuery, getWeather);

async function getWeather(req, res, next) {
   try {
      const { lat, lon } = await req.query;
      const weatherRes = await fetch(
         `${WEATHER_URL}${_DARK_KEY}/${lat},${lon}?exclude=hourly,daily,minutely`,
      );
      const responseBody = await weatherRes.json();

      if (responseBody.error) res.status(responseBody.code).send(responseBody.error);

      return res.status(200).send({ responseBody });
   } catch (error) {
      console.log('error >>>', error);
   }
}

function validationWeatherQuery(req, res, next) {
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

app.listen(PORT, () => {
   console.log('Listing ... >>', PORT);
});
