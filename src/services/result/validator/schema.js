import Joi from 'joi';

export const resultPayloadSchema = Joi.object({
  profileId: Joi.number().integer().required(),
});