const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const { userRouter } = require('./users/routes/users.router');

const { PORT, _PORT } = process.env;

module.exports = class Server {
   constructor() {
      this.server = null;
   }

   start() {
      this.initServer();
      this.initMiddlewares();
      this.initRoutes();
      this.serverListening();
   }

   initServer() {
      this.server = express();
   }
   initMiddlewares() {
      this.server.use(express.json());
      this.server.use(cors({ origin: `http://localhost:${PORT || _PORT}` }));
   }
   initRoutes() {
      this.server.use('/users', userRouter);
   }

   serverListening() {
      this.server.listen(PORT || _PORT, () => {
         console.log('Server started listening on port...', PORT || _PORT);
      });
   }
};
