const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');
dotenv.config();

const { SALT } = process.env;

const salt = bcrypt.genSaltSync(SALT.length);

async function hashPassword(data) {
   try {
      return await bcrypt.hash(data, salt);
   } catch (error) {
      console.error(new Error('not hash'));
   }
}

async function hashDate(params) {
   const hashParams = (await params) + SALT;
   return hashParams;
}
//const returnPassHash = await getHashPassword(password, hashPass);
async function getHashPassword(pass, hashPass) {
   try {
      return await bcrypt.compare(pass, hashPass);
   } catch (error) {
      console.error(new Error('not data '));
   }
}

async function getHashDate(params) {
   const hashParams = (await params) + SALT;
   return hashParams;
}
module.exports = {
   hashPassword,
   getHashPassword,
};
