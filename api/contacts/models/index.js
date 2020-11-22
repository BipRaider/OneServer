const mongoose = require('mongoose');
const {
   Types: { ObjectId },
} = require('mongoose');
const { contactModule } = require('./contactSchema');
//connectDB - connected to modngo database
async function connectDB({ MONGODB_URL }) {
   try {
      await mongoose.connect(MONGODB_URL);
      console.log('Successfully connect to db....');
   } catch (error) {
      throw new Error(' Not successfully connect to db...');
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

//to do
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
      const updateID = await contactModule.findUserByIdAndUpdate(contactID, newDate);
      if (!updateID) {
         throw new Error('Not found');
      }

      return updateID;
   } catch (error) {
      throw error;
   }
}

function validId(contactID) {
   if (!ObjectId.isValid(contactID)) {
      throw new Error('Not found');
   }
}

module.exports = {
   connectDB,
   updateContact,
   deleteContact,
   getContacts,
   getContact,
};
