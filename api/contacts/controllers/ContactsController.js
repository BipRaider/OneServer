const path = require('path');
const fs = require('fs');
const { promises: fsPromises } = require('fs');
const Joi = require('joi');
// собираем путь до файла json
// const pathToAsync = path.join(process.cwd(), '/api/contacts/db/contacts.json');
// // читаем файл
// const contacts = JSON.parse(fs.readFileSync(pathToAsync).toString());

const PATH_DB = path.join(process.cwd(), '/api/contacts/db/contacts.json');

// const PATH_DB = '/api/contacts/db/contacts.json';

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
   get getContact() {
      return this._getContact.bind(this);
   }

   //GET /api/contacts
   async _getContact(req, res, next) {
      try {
         const contacts_db = await this.dbJson(PATH_DB);
         return await res.json(contacts_db);
      } catch (error) {
         next(error);
      }
   }

   //GET /api/contacts/:contactId
   async _getContactId(req, res, next) {
      try {
         const contacts_db = await this.dbJson(PATH_DB);
         const targetContactIndex = await this.getByID(res, req.params.contactId);
         return await res.status(200).json(contacts_db[targetContactIndex]);
      } catch (error) {
         next(error);
      }
   }
   //POST /api/contacts
   async _createContact(req, res, next) {
      try {
         const contacts_db = await this.dbJson(PATH_DB);

         const newContact = await {
            ...req.body,
            id: contacts_db.length + 1,
         };

         await contacts_db.push(newContact);
         await this.writeInDB(contacts_db);

         return await res.status(201).json(newContact);
      } catch (error) {
         next(error);
      }
   }

   //PATCH /api/contacts/:contactId to do
   async _updateContact(req, res, next) {
      try {
         const contacts_db = await this.dbJson(PATH_DB);

         const targetContactIndex = await this.getByID(res, req.params.contactId);

         contacts_db[targetContactIndex] = {
            ...contacts_db[targetContactIndex],
            ...req.body,
         };

         await this.writeInDB(contacts_db);

         return await res.status(200).json(contacts_db[targetContactIndex]);
      } catch (error) {
         next(error);
      }
   }

   //DELETE /api/contacts/:contactId
   async _deleteContact(req, res, next) {
      try {
         const contacts_db = await this.dbJson(PATH_DB);
         const targetContactIndex = await this.getByID(res, req.params.contactId);
         await contacts_db.splice(targetContactIndex, 1);
         await this.writeInDB(contacts_db);
         return await res.status(200).json({ message: 'contact deleted' });
      } catch (error) {
         next(error);
      }
   }

   async getByID(res, contactID) {
      try {
         const contacts_db = await this.dbJson(PATH_DB);
         const id = await parseInt(contactID);
         const targetContactIndex = await contacts_db.findIndex(contact => contact.id === id);

         if (targetContactIndex === -1) {
            res.json({ message: 'Not found' });
            throw new NotFoundError('Not found');
         }
         return await targetContactIndex;
      } catch (error) {
         throw error;
      }
   }

   async writeInDB(writeDB) {
      try {
         const add = JSON.stringify(writeDB, null, 1);
         fsPromises.writeFile(PATH_DB, add);
      } catch (error) {
         throw error;
      }
   }

   async dbJson() {
      try {
         const listContact = await fsPromises.readFile(PATH_DB);
         const listContactString = await listContact.toString();
         return await JSON.parse(listContactString);
      } catch (error) {
         throw error;
      }
   }

   validateIdQuery(req, res, next) {
      res.status(400).json({ message: 'missing fields' });
      throw new NotFoundError({ message: 'missing fields' });
      next();
   }

   validatePostContact(req, res, next) {
      const ContactTemple = Joi.object({
         name: Joi.string().min(3).required(),
         email: Joi.string().min(3).required(),
         phone: Joi.string().min(9).required(),
      });
      const validated = ContactTemple.validate(req.body);

      if (validated.error) {
         res.status(404).send({
            message: `missing {'${validated.error.details[0].context.label}': ''} is required name field `,
         });
         throw new NotFoundError(
            `missing {'${validated.error.details[0].context.label}': ''} is required name field `,
         );
      }
      next();
   }

   validateUpdateContact(req, res, next) {
      const updateContactRules = Joi.object({
         name: Joi.string().min(3),
         email: Joi.string().min(3),
         phone: Joi.string().min(9),
      });
      const validated = updateContactRules.validate(req.body);

      if (validated.error) {
         res.status(400).send({
            message: validated.error.details[0].message,
         });
         throw new NotFoundError(validated.error.details[0].message);
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
