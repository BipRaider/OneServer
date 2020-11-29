const { userModule } = require('../../data/userSchema');
const { getHashPassword, hashPassword } = require('../../hash/hash');
const { UnauthorizedError } = require('../../helpers/errors.constructor');

async function getEmail(email) {
   try {
      const contact = await userModule.findUserByEmail(email);
      if (!contact) {
         throw new UnauthorizedError('Email in use', 409);
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
         throw new UnauthorizedError('Password failed..', 401);
      }

      return isPasswordValid;
   } catch (error) {
      throw error;
   }
}

async function createNewUser(data) {
   try {
      const { email, password } = data;

      const validUser = await userModule.findUserByEmail(email);
      if (validUser) {
         throw new UnauthorizedError('User do not create', 409);
      }

      const hashPass = await hashPassword(password);
      const newUser = await userModule.create({ ...data, password: hashPass });
      const returnUser = await {
         name: newUser._doc.name,
         email: newUser._doc.email,
      };

      return returnUser;
   } catch (error) {
      throw error;
   }
}

module.exports = {
   createNewUser,
   getEmail,
   validPassword,
};
