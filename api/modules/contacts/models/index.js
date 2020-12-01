const { contactModule } = require('../../../data/contactSchema');
const { hashPassword } = require('../../helpers/hash/hash');

async function creatContact(data, res) {
   try {
      const { email, password } = data;
      const validContact = await contactModule.findContactByEmail(email);
      if (validContact) {
         return false;
      }

      const hashPass = await hashPassword(password);
      const newContact = await contactModule.create({ ...data, password: hashPass });
      const returnContact = await {
         name: newContact._doc.name,
         email: newContact._doc.email,
         phone: newContact._doc.phone,
      };
      return returnContact;
   } catch (error) {
      throw error;
   }
}

async function getContacts() {
   try {
      return await contactModule.find();
   } catch (error) {}
}

async function getContact(contactID) {
   try {
      const foundID = await contactModule.findById(contactID);

      if (!foundID) {
         throw new Error('Not found id');
      }

      return foundID;
   } catch (error) {
      throw error;
   }
}

async function deleteContact(contactID) {
   try {
      const deleteID = await contactModule.findByIdAndDelete(contactID);
      if (!deleteID) {
         throw new Error('Not found');
      }
      return deleteID;
   } catch (error) {
      throw error;
   }
}

async function updateContact(contactID, newDate) {
   try {
      const updateID = await contactModule.findContactByIdAndUpdate(contactID, newDate);
      if (!updateID) {
         throw new Error('Not found');
      }
      return updateID;
   } catch (error) {
      throw error;
   }
}

module.exports = {
   creatContact,
   updateContact,
   deleteContact,
   getContacts,
   getContact,
};
