const Joi = require('joi');

async function validateSingOut(req, res, next) {
   const updateContactRules = Joi.object({
      name: Joi.string().min(3),
      email: Joi.string()
         .min(3)
         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw'] } }),
      phone: Joi.string().min(9),
      subscription: Joi.string().min(1),
      password: Joi.string().min(),
      token: Joi.string().min(1),
   });
   const validated = updateContactRules.validate(req.body);

   if (validated.error) {
      res.status(400).send({
         message: validated.error.details[0].message,
      });
      throw new NotFoundError(validated.error.details[0].message);
   }
   next();
}

class NotFoundError extends Error {
   constructor(message) {
      super(message);
      this.status = 404;
      delete this.stack;
   }
}

module.exports = {
   validateSingOut,
};
