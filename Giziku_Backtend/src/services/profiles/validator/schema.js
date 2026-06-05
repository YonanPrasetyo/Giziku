import Joi from 'joi';

export const profilePayloadSchema = Joi.object({
  userId: Joi.number().integer().required(),
  name: Joi.string().required(),
  dateOfBirth: Joi.date().iso().allow(null),
  weight: Joi.number().precision(2).allow(null),
  height: Joi.number().precision(2).allow(null),
  gender: Joi.string().valid('M', 'F').allow(null),
  relation: Joi.string().required(),
});
