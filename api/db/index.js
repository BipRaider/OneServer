//node  api/db/index.js
const mongodb = require('mongodb');
const { MongoClient, ObjectID } = mongodb;

const { MONGODB_URL, DB_NAME, CONTACTS } = require('./config');

let collectionDB;

async function db() {
   try {
      const db = await connectDB({ MONGODB_URL, DB_NAME });
      collectionDB = await getCollection({ db, CONTACTS });
   } catch (error) {
      throw error;
   }
}

async function connectDB({ MONGODB_URL, DB_NAME }) {
   try {
      const client = await MongoClient.connect(MONGODB_URL);
      console.log('Successfully connected to db....');
      return await client.db(DB_NAME);
   } catch (error) {
      throw new Error('Error connected to db...');
   }
}

async function getCollection({ db, CONTACTS }) {
   try {
      return await db.collection(CONTACTS);
   } catch (error) {
      throw error;
   }
}

async function addContact(contact) {
   try {
      const newContact = await collectionDB.insert(contact);
      return newContact;
   } catch (error) {}
}

async function getContact(contactID) {
   try {
      await validId(contactID);
      const foundID = await collectionDB.findOne({ _id: ObjectID(contactID) });
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
      const deleteID = await collectionDB.deleteOne({ _id: ObjectID(contactID) });
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

      const updateID = await collectionDB.updateOne(
         { _id: ObjectID(contactID) },
         { $set: newDate },
      );

      if (updateID.modifiedCount === 0) {
         throw new Error('Not found');
      }

      return updateID;
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
   db,
   addContact,
   getContact,
   getContacts,
   deleteContact,
   updateContact,
};
