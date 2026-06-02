import Joi from 'joi';

export const foodPayloadSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  portionSize: Joi.string().required(),
  calories: Joi.number().integer().required(),
  protein: Joi.number().integer().required(),
  sugar: Joi.number().integer().required(),
  carbohydrates: Joi.number().integer().required(),
  fat: Joi.number().integer().required(),
});