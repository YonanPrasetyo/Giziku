import Joi from 'joi';

export const resultPayloadSchema = Joi.object({
  profileId: Joi.number().integer().required(),
});

export const directResultPayloadSchema = Joi.object({
  profileId: Joi.number().integer().required(),
  foodName: Joi.string().required(),
});