require('dotenv').config();

const { MONGODB_URL } = process.env;
const CONTACTS = 'contacts';
const DB_NAME = 'hw3';

module.exports = {
   MONGODB_URL,
   DB_NAME,
   CONTACTS,
};
