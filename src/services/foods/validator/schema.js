import Joi from 'joi';

export const foodPayloadSchema = Joi.object({
  profileId: Joi.number().integer().required(),
});