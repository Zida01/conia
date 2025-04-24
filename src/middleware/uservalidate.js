const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6)
});

module.exports = {
  createUserSchema,
  updateUserSchema
};
