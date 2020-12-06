const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const { connectDB } = require('@data');
const { authRouter } = require('./modules/auth/routes/auth.router');
const userRouter = require('./modules/users/routes/user.router');
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
      this.server.use('/user', userRouter);
   }
   //запускаем сервер
   serverListening() {
      this.server.listen(PORT || _PORT, () => {
         console.log('Server started listening on port...', PORT || _PORT);
      });
   }
};

// app.use('/public/uploads', express.static('uploads'));
// app.use('/public', express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
//     if (req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
//         res.setHeader('Access-Control-Allow-Credentials', true);
//         return res.status(200).json({});
//     }
//     next();
// });
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.json({limit: '50mb', extended: true}));
