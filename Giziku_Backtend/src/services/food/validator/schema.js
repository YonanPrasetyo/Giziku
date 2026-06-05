import Joi from 'joi';

export const foodPayloadSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  portionSize: Joi.string().required(),
  calories: Joi.number().required(),
  protein: Joi.number().required(),
  sugar: Joi.number().required(),
  carbohydrates: Joi.number().required(),
  fat: Joi.number().required(),
});