const moduleAlias = require('module-alias');

function myModuleAlias() {
   moduleAlias.addAliases({
      '@': __dirname + '/api',
      '@services': __dirname + '/api/server.js',
      '@data': __dirname + '/api/data',
      '@controllers': __dirname + '/api/controllers',
      '@middleware': __dirname + '/api/middleware',
      '@routes': __dirname + '/api/routes',
      '@helpers': __dirname + '/api/helpers',
      '@token': __dirname + '/api/token',

      '@contactRouter': __dirname + '/api/modules/contacts/routes/contacts.router',
      '@authRouter': __dirname + '/api/modules/auth/routes/auth.router',
   });
   moduleAlias(__dirname + '/package.json');
   return moduleAlias();
}

module.exports = myModuleAlias;
