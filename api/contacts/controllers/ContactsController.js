const Joi = require('joi');
const _ = require('lodash');

const {
   creatContact,
   getContacts,
   getContact,
   deleteContact,
   updateContact,
} = require('../models/index');

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
   get getCurrentContact() {
      return this._getCurrentContact.bind(this);
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

   //GET /api/contacts/:contactId
   async _getContactId(req, res, next) {
      try {
         const contact = await getContact(req.params.contactId);
         return await res.status(200).json(this.prepareContactResponse(contact));
      } catch (error) {
         res.status(404).send({ message: 'Nod found id' });
         next(error);
      }
   }

   //GET /api/contacts/current
   async _getCurrentContact(req, res, next) {
      const [userForResponse] = this.prepareContactsResponse([req.user]);
      return res.status(200).json(userForResponse);
   }

   //POST /api/contacts
   async _createContact(req, res, next) {
      try {
         const newContact = await creatContact(req.body, res);
         if (!newContact) {
            return res.status(409).send({ message: 'Contact do not create' });
         }
         return await res.status(201).json(newContact);
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

   validatePostContact(req, res, next) {
      const ContactTemple = Joi.object({
         name: Joi.string().min(3).required(),
         email: Joi.string()
            .min(3)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw'] } }) // валидация мыла
            .required(),
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
         email: Joi.string()
            .min(3)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw'] } }),
         phone: Joi.string().min(9),
         subscription: Joi.string().min(1),
         password: Joi.string().min(3),
         token: Joi.string().min(1),
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

   prepareContactsResponse(contacts) {
      return contacts.map(data => {
         return this.prepareContactResponse(data);
      });
   }
   prepareContactResponse(contact) {
      const { name, email, phone, _id } = contact;
      return { id: _id, name, email, phone };
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
