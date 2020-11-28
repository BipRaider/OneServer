const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const CONTACTS = 'contact';
const { SALT } = process.env;

const defaultConfig = {
   type: String,
   required: true,
};

const contactSchema = new Schema({
   name: { ...defaultConfig },
   email: { ...defaultConfig },
   phone: { ...defaultConfig },

   subscription: { type: String },
   password: { type: String },
   token: { type: String },
});

contactSchema.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;

async function findContactByIdAndUpdate(contactID, params) {
   return await this.findByIdAndUpdate(contactID, { $set: params }, { new: true });
}

const contactModule = mongoose.model(CONTACTS, contactSchema);

module.exports = {
   contactModule,
};
