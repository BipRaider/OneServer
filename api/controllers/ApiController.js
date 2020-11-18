class ApiController {
   get getApi() {
      return this._getApi.bind(this);
   }
   //GET
   async _getApi(req, res, next) {
      try {
         return await res.send({
            contacts: {
               get: '/contacts',
               get: '/contacts/:contactId',
               post: '/contacts',
               patch: '/contacts/:contactId',
               delete: '/contacts/:contactId',
            },
         });
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new ApiController();
