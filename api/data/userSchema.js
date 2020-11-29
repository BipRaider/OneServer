const mongoose = require('mongoose');
const {
   Schema,
   Types: { ObjectId },
} = require('mongoose');
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

   favoriteFilmIds: [{ type: ObjectId, ref: 'film' }], // чтобы можно привязывать id к  данной строке надо использовать  ObjectId
});

userSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.updateToken = updateToken;

async function findUserByIdAndUpdate(userID, newParams) {
   return await this.findByIdAndUpdate(userID, { $set: newParams }, { new: true });
}

async function updateToken(id, newToken) {
   return await this.findByIdAndUpdate(id, { token: newToken }, { new: true });
}

async function findUserByEmail(email) {
   return await this.findOne({ email });
}

const userModule = mongoose.model(user, userSchema);

module.exports = {
   userModule,
};
