import Joi from 'joi';

export const missionPayloadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  xp: Joi.number().integer().required(),
});
