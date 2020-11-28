const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const CONTACTS = 'contact';

const defaultConfig = { type: String, required: true };
const authConfig = { type: String, required: false };

const contactSchema = new Schema({
   name: { ...defaultConfig },
   email: { ...defaultConfig },
   phone: { ...defaultConfig },
   token: { ...authConfig },
   subscription: { type: String },
   password: { ...defaultConfig },
});

contactSchema.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;
contactSchema.statics.findContactByEmail = findContactByEmail;
contactSchema.statics.updateToken = updateToken;

async function findContactByIdAndUpdate(contactID, newParams) {
   return await this.findByIdAndUpdate(contactID, { $set: newParams }, { new: true });
}

async function findContactByEmail(email) {
   return await this.findOne({ email });
}
async function updateToken(id, newToken) {
   return await this.findByIdAndUpdate(id, { token: newToken }, { new: true });
}

const contactModule = mongoose.model(CONTACTS, contactSchema);

module.exports = {
   contactModule,
};
