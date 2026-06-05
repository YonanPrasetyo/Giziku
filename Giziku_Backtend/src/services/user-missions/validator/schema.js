import Joi from 'joi';

export const userMissionPayloadSchema = Joi.object({
  profileId: Joi.number().integer().required(),
  missionId: Joi.number().integer().required(),
  assignedDate: Joi.date().iso().allow(null),
  mealType: Joi.string().valid('breakfast', 'lunch', 'dinner').allow(null),
  isCompleted: Joi.boolean().allow(null),
});
