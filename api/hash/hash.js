const bcrypt = require('bcryptjs');
require('dotenv').config();

async function hashPassword(data) {
   try {
      const salt = await bcrypt.genSalt(8);
      return await bcrypt.hash(data, salt);
   } catch (error) {
      console.error(new Error('Not data hash...'));
   }
}

async function getHashPassword(pass, hashPass) {
   try {
      console.log('start getHashPassword');

      const re = bcrypt.getRounds(hashPass);
      const sald = bcrypt.getSalt(hashPass);
      console.dir(re);
      console.dir(sald);
      const valid = await bcrypt.compare(pass, hashPass);
      console.dir(valid);
      if (!valid) {
         throw new Error('Password wrong....');
      }

      return valid;
   } catch (error) {
      console.log('<<<getHashPassword>>>');
   }
}

module.exports = {
   hashPassword,
   getHashPassword,
};
