const mongodb = require('mongodb');
const { MongoClient, ObjectID } = mongodb;

let collectionDB;

async function connectDB({ MONGODB_URL, DB_NAME }) {
   try {
      const client = await MongoClient.connect(MONGODB_URL);
      console.log('Successfully connected to db....');
      return await client.db(DB_NAME);
   } catch (error) {
      throw new Error('Error connected to db...');
   }
}

async function addContact(contact) {
   try {
      const newContact = await collectionDB.insert(contact);
      return newContact.ops[0];
   } catch (error) {}
}

async function getContact(contactID) {
   try {
      await validId(contactID);
      const foundID = await collectionDB.findOne({ _id: contactID });
      if (!foundID) {
         throw new Error('not found');
      }
      return foundID;
   } catch (error) {
      throw error;
   }
}

async function getContacts() {
   try {
      return await collectionDB.find().toArray();
   } catch (error) {}
}

async function deleteContact(contactID) {
   try {
      await validId(contactID);
      const deleteID = await collectionDB.deleteOne({ _id: contactID });
      if (!deleteID.deletedCount) {
         throw new Error('Not found');
      }
   } catch (error) {
      throw error;
   }
}

async function updateContact(contactID, newDate) {
   try {
      await validId(contactID);

      const updateContact = await collectionDB.updateOne(
         { _id: contactID },
         // { $set: newDate },
         { new: true },
      );

      if (updateContact.matchedCount === 0) {
         throw new Error('Not found');
      }

      return updateContact;
   } catch (error) {
      throw error;
   }
}

function validId(contactID) {
   if (!ObjectID.isValid(contactID)) {
      throw new Error('This id is not found');
   }
}

module.exports = {
   connectDB,
   addContact,
   getContact,
   getContacts,
   deleteContact,
   updateContact,
};
