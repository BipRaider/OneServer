const { contactModule } = require('@data');
const { UnauthorizedError, hash } = require('@helpers');

const { hashPassword } = hash;

async function creatContact(data, res) {
   try {
      const { email, password } = data;
      const validContact = await contactModule.findContactByEmail(email);

      if (validContact) {
         throw new UnauthorizedError('Contact do not create', 409);
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
         throw new UnauthorizedError('Not found id', 404);
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
         throw new UnauthorizedError('Not found', 404);
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
         throw new UnauthorizedError('Not found', 404);
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
