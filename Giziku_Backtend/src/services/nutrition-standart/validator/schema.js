import Joi from 'joi';

export const nutritionStandartPayloadSchema = Joi.object({
  ageMin: Joi.number().integer().required(),
  ageMax: Joi.number().integer().required(),
  gender: Joi.string().valid('M', 'F').required(),
  calories: Joi.number().integer().required(),
  protein: Joi.number().integer().required(),
  sugar: Joi.number().integer().required(),
});