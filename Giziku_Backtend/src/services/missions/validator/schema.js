import Joi from 'joi';

export const missionPayloadSchema = Joi.object({
  food_id: Joi.number().integer().required(),
  description: Joi.string().required(),
  xp: Joi.number().integer().required(),
});
