const { getContacts } = require('../models/index');

class ContactsController {
   get getContactId() {
      return this._getContactId.bind(this);
   }
   //GET /api/contacts
   async _getContact(req, res, next) {
      try {
         const contacts_db = await getContacts();
         return await res.json(this.prepareContactsResponse(contacts_db));
      } catch (error) {
         next(error);
      }
   }
}

module.exports = new ContactsController();
