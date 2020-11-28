const jwt = require('jsonwebtoken');
const { contactModule } = require('../../data/contactSchema');
const { hashPassword } = require('../../hash/hash');

async function getEmail(email) {
   try {
      const contact = await contactModule.findContactByEmail(email);
      if (!contact) {
         throw new Error('Not contact...');
      }
      return contact;
   } catch (error) {
      throw error;
   }
}

async function validPassword(pass, hashPass) {
   try {
      const isPasswordValid = await hashPassword(pass, hashPass);

      if (!contact) {
         throw new Error('Not contact...');
      }
      return isPasswordValid;
   } catch (error) {
      throw error;
   }
}

async function updateContactToken(userID) {
   try {
      const token = await jwt.sign({ id: userID }, 'sold_token');

      const newToken = await contactModule.updateToken(userID, token);
      if (!newToken) {
         throw new Error('Not found');
      }
      return newToken;
   } catch (error) {
      throw error;
   }
}

module.exports = {
   updateUser,
   getEmail,
   validPassword,
};
