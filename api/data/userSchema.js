const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const user = 'user';

const defaultConfig = { type: String, required: true };
const authConfig = { type: String, required: false };
const subscriptionConfig = { type: String, enum: ['free', 'pro', 'premium'], default: 'free' };

const userSchema = new Schema({
   name: { ...defaultConfig },
   email: { ...defaultConfig, unique: true },
   password: { ...defaultConfig },

   token: { ...authConfig },
   subscription: { ...subscriptionConfig },
});

userSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.updateToken = updateToken;

async function findUserByIdAndUpdate(userID, newParams) {
   return await this.findByIdAndUpdate(userID, { $set: newParams }, { new: true });
}

async function findUserByEmail(email) {
   return await this.findOne({ email });
}
async function updateToken(id, newToken) {
   return await this.findByIdAndUpdate(id, { token: newToken }, { new: true });
}

const userModule = mongoose.model(user, userSchema);

module.exports = {
   userModule,
};
