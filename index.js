'user strict';
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: process.cwd() + 'static/' });

//https://powerful-springs-97618.herokuapp.com
//https://frozen-beyond-70066.herokuapp.com   -- my test
const myModuleAlias = require('./myModuleAlias');
myModuleAlias();

//---------------------------------------------

///-------------------------------------------
const Server = require('@/server');
new Server().start();

app.post('/form-data', upload.single('avatar'), (req, res, next) => {
   console.log('post-avatar req.body >>>', req.body);
   console.log('post-avatar req.file >>>', req.params);
   console.log('post-avatar req.query >>>', req.query);
   console.log('post-avatar req.files >>>', req.file);

   return res.status(200).send('post-avatar');
});

app.listen(3001, () => {
   console.log('goooo.....');
});
