const mongoose = require('mongoose');

// mongoose.set('debug', true); -- включит отслеживания действий mongoose

async function connectDB({ MONGODB_URL }) {
   try {
      await mongoose.connect(MONGODB_URL);
      console.log('Successfully connect to db....');
   } catch (error) {
      throw new Error(' Not successfully connect to db...');
   }
}

module.exports = {
   connectDB,
};
