const moduleAlias = require('module-alias');

function myModuleAlias() {
   moduleAlias.addAliases({
      '@': __dirname + '/api',
      '@hash': __dirname + '/api/helpers/hash/hash.js',
      '@services': __dirname + '/api/server.js',
      '@routes': __dirname + '/api/routes',
      '@middleware': __dirname + '/api/middleware',
      '@contactRouter': __dirname + '/api/modules/contacts/routes/contacts.router',
      '@authRouter': __dirname + '/api/modules/auth/routes/auth.router',
   });
   moduleAlias(__dirname + '/package.json');
   return moduleAlias();
}

module.exports = myModuleAlias;
