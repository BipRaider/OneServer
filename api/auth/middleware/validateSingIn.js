const Joi = require('joi');

async function validateSingIn(req, res, next) {
   try {
      const userTemple = await Joi.object({
         email: Joi.string()
            .min(3)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw'] } }) // валидация мыла
            .required(),
         password: Joi.string().min(3),
      });
      const validated = await userTemple.validate(req.body);
      if (validated.error) {
         res.status(404).send({
            message: `missing {'${validated.error.details[0].context.label}': ''} is required  field `,
         });
         throw new NotFoundError(
            `missing {'${validated.error.details[0].context.label}': ''} is required field `,
         );
      }
      next();
   } catch (error) {
      next(error);
   }
}

class NotFoundError extends Error {
   constructor(message) {
      super(message);
      this.status = 404;
      delete this.stack;
   }
}

module.exports = {
   validateSingIn,
};
