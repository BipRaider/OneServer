const Joi = require('joi');
const { UnauthorizedError } = require('@helpers');

async function validateAddFilmForUser(req, res, next) {
   try {
      const avatarTemple = await Joi.object({
         avatar: Joi.string().min(3).required(),
      });
      const validated = await avatarTemple.validate(req.body);

      if (validated.error) {
         throw new UnauthorizedError(
            `missing {'${validated.error.details[0].context.label}': ''} is required field `,
            400,
         );
      }

      next();
   } catch (error) {
      next(error);
   }
}

module.exports = validateAddFilmForUser;
