'user strict';
//https://powerful-springs-97618.herokuapp.com
//https://frozen-beyond-70066.herokuapp.com   -- my test

const myModuleAlias = require('./myModuleAlias');
myModuleAlias();

const Server = require('@/server');
new Server().start();
