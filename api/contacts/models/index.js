const { contactModule } = require('./contactSchema');

async function creatContact(data) {
   try {
      const newContact = await contactModule.create(data);
      return newContact;
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
