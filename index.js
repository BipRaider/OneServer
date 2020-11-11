const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const { PORT, _PORT } = process.env;

module.exports = class UserServer {
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
      this.server.use(cors({ origin: `http://localhost:${PORT}` }));
   }
   initRoutes() {}

   serverListening() {
      this.server.listen(PORT || _PORT, () => {
         console.log('Server started listening on port...', PORT || _PORT);
      });
   }
};
