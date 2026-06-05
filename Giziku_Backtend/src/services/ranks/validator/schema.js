import Joi from 'joi';

export const rankPayloadSchema = Joi.object({
  name: Joi.string().required(),
  minXp: Joi.number().integer().required(),
  maxXp: Joi.number().integer().required(),
});
