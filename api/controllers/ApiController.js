class ApiController {
   get getApi() {
      return this._getApi.bind(this);
   }
   //GET
   async _getApi(req, res, next) {
      try {
         return await res.status(200).json({
            query: {
               users: {
                  get: '/users',
                  post: '/users',
                  patch: '/users/:id',
                  delete: '/users/:id',
               },
               contacts: {
                  get: '/contacts',
                  get: '/contacts/:contactId',
                  post: '/contacts',
                  patch: '/contacts/:contactId',
                  delete: '/contacts/:contactId',
               },
               weather: {
                  get: `/weather?lon=''&lat=''`,
               },
            },
         });
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new ApiController();
