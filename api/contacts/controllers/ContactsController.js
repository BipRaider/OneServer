const path = require('path');
const { promises: fsPromises } = require('fs');
const Joi = require('joi');

const { addContact, getContact, getContacts, deleteContact, updateContact } = require('../../db');

const PATH_DB = path.join(process.cwd(), '/api/contacts/db/contacts.json');
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
         const contacts_db = await getContacts();
         return await res.json(contacts_db);
      } catch (error) {
         next(error);
      }
   }

   //GET /api/contacts/:contactId
   async _getContactId(req, res, next) {
      try {
         const contactFromDb = await getContact(req.params.contactId);
         return await res.status(200).json(contactFromDb);
      } catch (error) {
         res.status(404).send({ message: 'Nod found id' });
         next(error);
      }
   }
   //POST /api/contacts
   async _createContact(req, res, next) {
      try {
         await addContact(req.body);
         return await res.status(201).json(req.body);
      } catch (error) {
         res.status(500);
         next(error);
      }
   }

   //PATCH /api/contacts/:contactId to do
   async _updateContact(req, res, next) {
      try {
         const newContact = await updateContact(req.params.contactId, req.body);
         console.dir(newContact);
         return await res.status(200).json({ message: 'Contact update' });
      } catch (error) {
         res.status(404).send({ message: 'Not found' });
         next(error);
      }
   }

   //DELETE /api/contacts/:contactId
   async _deleteContact(req, res, next) {
      try {
         await deleteContact(req.params.contactId);
         return await res.status(204).json({ message: 'Contact deleted' });
      } catch (error) {
         res.status(404).send({ message: 'Not found' });
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
