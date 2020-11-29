const { contactModule } = require('../../data/contactSchema');
const { getHashPassword } = require('../../hash/hash');
const { UnauthorizedError } = require('../../helpers/errors.constructor');

async function getEmail(email) {
   try {
      const contact = await contactModule.findContactByEmail(email);

      if (!contact) {
         throw new UnauthorizedError('Authentication failed 1...', 401);
      }

      return contact;
   } catch (error) {
      throw error;
   }
}

async function validPassword(pass, hashPass) {
   try {
      const { password } = hashPass;
      const isPasswordValid = await getHashPassword(pass, password);

      if (!isPasswordValid) {
         throw new UnauthorizedError('Authentication failed 2...', 401);
      }

      return isPasswordValid;
   } catch (error) {
      throw error;
   }
}

module.exports = {
   getEmail,
   validPassword,
};
