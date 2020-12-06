const { userModule } = require('@data');
const { hash, UnauthorizedError } = require('@helpers');
const { getHashPassword, hashPassword } = hash;

async function updateUser(contactID, newDate) {
   try {
      const updateID = await userModule.findUserByIdAndUpdate(contactID, newDate);
      if (!updateID) {
         throw new UnauthorizedError('Not found', 404);
      }
      return updateID;
   } catch (error) {
      throw error;
   }
}

module.exports = { updateUser };
