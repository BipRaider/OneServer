const path = require('path');
const fs = require('fs');
const { promises: fsPromises } = require('fs');
const Joi = require('joi');
// собираем путь до файла json
const pathToAsync = path.join(process.cwd(), '/api/contacts/db/contacts.json');
// читаем файл
const contacts = JSON.parse(fs.readFileSync(pathToAsync).toString());

class ContactsController {
   get getContactId() {
      return this._getContactId.bind(this);
   }
   get createContact() {
      return this._createContact.bind(this);
   }
   get updateContact() {
      return this._updateContact.bind(this);
   }
   get deleteContact() {
      return this._deleteContact.bind(this);
   }

   //GET /api/contacts
   async getContact(req, res, next) {
      try {
         return await res.json(contacts);
      } catch (error) {
         next(error);
      }
   }

   //GET /api/contacts/:contactId
   async _getContactId(req, res, next) {
      try {
         const targetContactIndex = await this.getByID(res, req.params.contactId);
         return await res.status(200).json(contacts[targetContactIndex]);
      } catch (error) {
         next(error);
      }
   }
   //POST /api/contacts
   async _createContact(req, res, next) {
      try {
         const newContact = await {
            ...req.body,
            id: contacts.length + 1,
         };
         await contacts.push(newContact);
         await this.writeInDB();
         return await res.status(201).json(newContact);
      } catch (error) {
         next(error);
      }
   }

   //PATCH /api/contacts/:contactId to do
   async _updateContact(req, res, next) {
      try {
         console.dir(req.params);
         console.log(req.body);
         const targetContactIndex = await this.getByID(res, req.params.contactId);

         contacts[targetContactIndex] = {
            ...contacts[targetContactIndex],
            ...req.body,
         };

         await this.writeInDB();

         return await res.status(200).json(contacts[targetContactIndex]);
      } catch (error) {
         next(error);
      }
   }

   //DELETE /api/contacts/:contactId
   async _deleteContact(req, res, next) {
      try {
         const targetContactIndex = await this.getByID(res, req.params.contactId);
         await contacts.splice(targetContactIndex, 1);
         await this.writeInDB();
         return await res.status(200).json({ message: 'contact deleted' });
      } catch (error) {
         next(error);
      }
   }

   getByID(res, contactID) {
      const id = parseInt(contactID);
      const targetContactIndex = contacts.findIndex(contact => contact.id === id);
      if (targetContactIndex === -1) {
         res.json({ message: 'Not found' });
         throw new NotFoundError('Not found');
      }
      return targetContactIndex;
   }

   writeInDB() {
      const add = JSON.stringify(contacts, null, 1);
      fsPromises.writeFile(pathToAsync, add);
   }

   validateIdQuery(req, res, next) {
      res.status(400).json({ message: 'missing fields' });
      next();
   }

   validatePostContact(req, res, next) {
      const ContactTemple = Joi.object({
         name: Joi.string().required(),
         email: Joi.string().required(),
         phone: Joi.string().required(),
      });
      const validated = ContactTemple.validate(req.body);

      if (validated.error) {
         res.status(404).send({
            message: `missing {'${validated.error.details[0].context.label}': ''} is required name field `,
         });
         return;
      }
      next();
   }

   validateUpdateContact(req, res, next) {
      const updateContactRules = Joi.object({
         name: Joi.string(),
         email: Joi.string(),
         phone: Joi.string(),
      });

      const validated = updateContactRules.validate(req.body);

      if (validated.error) {
         res.status(400).send(validated.error);
         return;
      }
      next();
   }
}

class NotFoundError extends Error {
   constructor(message) {
      super(message);
      this.status = 404;
      delete this.stack;
   }
}

module.exports = new ContactsController();
