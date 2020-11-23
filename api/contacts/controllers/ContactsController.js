const {
   Types: { ObjectId },
} = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');

const { hashPassword, getHashPassword } = require('../hash/hash');

const { contactModule } = require('../models/contactSchema');
const { getContacts, getContact, deleteContact, updateContact } = require('../models/index');
const { array } = require('joi');

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
         const getPass = getHashPassword();
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
         const { password } = req.body;
         const hashPass = await hashPassword(password);
         const returnPassHash = await getHashPassword(password, hashPass);
         console.dir(returnPassHash);
         const newContact = await contactModule.create({ ...req.body, password: hashPass });
         const returnContact = await {
            name: newContact._doc.name,
            email: newContact._doc.email,
            phone: newContact._doc.phone,
         };

         return await res.status(201).json(returnContact);
      } catch (error) {
         res.status(500).send({ message: 'Failed to create' });
         next(error);
      }
   }

   //PATCH /api/contacts/:contactId to do
   async _updateContact(req, res, next) {
      try {
         const update = await updateContact(req.params.contactId, req.body);
         return await res.status(200).json(update);
      } catch (error) {
         res.status(404).send({ message: 'Not found' });
         next(error);
      }
   }

   //DELETE /api/contacts/:contactId
   async _deleteContact(req, res, next) {
      try {
         const delContact = await deleteContact(req.params.contactId);
         return await res.status(204).json(delContact);
      } catch (error) {
         res.status(404).send({ message: 'Not found' });
         next(error);
      }
   }

   validateIdQuery(req, res, next) {
      if (!ObjectId.isValid(req.params.contactId)) {
         return res.status(400).send({ message: `${'This Id is not found'}` });
      }
      next();
   }

   validatePostContact(req, res, next) {
      const ContactTemple = Joi.object({
         name: Joi.string().min(3).required(),
         email: Joi.string().min(3).required(),
         phone: Joi.string().min(9).required(),
         subscription: Joi.string().min(3),
         password: Joi.string().min(3),
         token: Joi.string().min(3),
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
