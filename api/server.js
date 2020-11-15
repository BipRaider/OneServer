const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const dotenv = require('dotenv');
dotenv.config();
const { apiRouter } = require('./routes/router');

const { PORT, _PORT } = process.env;

module.exports = class Server {
   constructor() {
      this.server = null;
   }
   // стар всех функций при запуске класса new Server().start
   start() {
      this.initServer();
      this.initMiddlewares();
      this.initRoutes();
      this.serverListening();
   }
   //объявляем сервер
   initServer() {
      this.server = express();
   }
   // стартовые настройки для всех URI
   initMiddlewares() {
      this.server.use(morgan('combined'));
      this.server.use(express.json());
      this.server.use(cors({ origin: `http://localhost:${PORT || _PORT}` }));
   }
   // инициализируем   роутера
   initRoutes() {
      this.server.use('/api', apiRouter);
   }
   //запускаем сервер
   serverListening() {
      this.server.listen(PORT || _PORT, () => {
         console.log('Server started listening on port...', PORT || _PORT);
      });
   }
};
