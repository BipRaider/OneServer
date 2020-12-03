const Joi = require('joi');
const { UnauthorizedError } = require('@helpers');

async function validateAddFilmForUser(req, res, next) {
   try {
      const filmTemple = await Joi.object({
         name: Joi.string().min(3).required(),
      });
      const validated = await filmTemple.validate(req.body);

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
