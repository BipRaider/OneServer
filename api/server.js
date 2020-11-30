const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const { connectDB } = require('./data/connectDB');
const { authRouter } = require('./auth/routes/auth.router');
const { apiRouter } = require('./routes/router');

const { PORT, _PORT, MONGODB_URL } = process.env;

module.exports = class Server {
   constructor() {
      this.server = null;
   }
   // стар всех функций при запуске класса new Server().start
   async start() {
      this.initServer();
      this.initMiddlewares();
      this.initRoutes();
      await this.initDatabase();
      this.serverListening();
   }
   //объявляем сервер
   initServer() {
      this.server = express();
   }

   async initDatabase() {
      await connectDB({ MONGODB_URL });
   }
   // стартовые настройки для всех URI
   initMiddlewares() {
      this.server.use(morgan('combined'));
      this.server.use(express.urlencoded());
      this.server.use(express.json());
      this.server.use(cors({ origin: `http://localhost:${PORT || _PORT}` }));
   }
   // инициализируем   роутера
   initRoutes() {
      this.server.use('/api', apiRouter);
      this.server.use('/auth', authRouter);
   }
   //запускаем сервер
   serverListening() {
      this.server.listen(PORT || _PORT, () => {
         console.log('Server started listening on port...', PORT || _PORT);
      });
   }
};
