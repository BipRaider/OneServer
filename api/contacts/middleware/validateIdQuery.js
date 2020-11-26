const {
   Types: { ObjectId },
} = require('mongoose');

async function validateIdQuery(req, res, next) {
   if (!ObjectId.isValid(req.params.contactId)) {
      return res.status(400).send({ message: `${'This Id is not found'}` });
   }
   next();
}

module.exports = {
   validateIdQuery,
};
