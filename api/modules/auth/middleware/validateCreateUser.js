const Joi = require('joi');
const { UnauthorizedError } = require('@helpers');

function validateCreateUser(req, res, next) {
   try {
      const userTemple = Joi.object({
         name: Joi.string().min(3).required(),
         email: Joi.string()
            .min(3)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw'] } }) // валидация мыла
            .required(),
         avatarURL: Joi.string().min(3),
         subscription: Joi.string().min(3),
         password: Joi.string().min(3),
         token: Joi.string(),
      });

      const validated = userTemple.validate(req.body);

      if (validated.error) {
         throw new UnauthorizedError(
            `missing {'${validated.error.details[0].context.label}': ''} is required name field `,
            400,
         );
      }

      next();
   } catch (error) {
      next(error);
   }
}

module.exports = validateCreateUser;
