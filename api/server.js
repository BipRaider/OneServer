const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { connectDB } = require('./contacts/models');

const dotenv = require('dotenv');
dotenv.config();
const { apiRouter } = require('./routes/router');

const { PORT, _PORT, MONGODB_URL } = process.env;

module.exports = class Server {
   constructor() {
      this.server = null;
      this.db = null;
   }
   // стар всех функций при запуске класса new Server().start
   async start() {
      await this.initDatabase();
      this.initServer();
      this.initMiddlewares();
      this.initRoutes();
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
