const Joi = require('@hapi/joi');

const getUserById = {
  body: Joi.object().keys({
    userId: Joi.string().label('User Id').min(24).max(24).required(),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    userId: Joi.string().label('User Id').required().min(24).max(24),
    firstName: Joi.string()
      .label('Name')
      .min(3)
      .max(30)
      .required()
      .pattern(/^[a-zA-Z0-9, ]*$/)
      .messages({
        'string.pattern.base': '{{#label}} is only allowed to alphabet characters',
      }),
    lastName: Joi.string()
      .label('Name')
      .min(3)
      .max(30)
      .required()
      .pattern(/^[a-zA-Z0-9, ]*$/)
      .messages({
        'string.pattern.base': '{{#label}} is only allowed to alphabet characters',
      }),
  }),
};

const changeUserStatus = {
  body: Joi.object().keys({
    userId: Joi.string().label('User Id').min(24).max(24).required(),
  }),
};

module.exports = { getUserById, updateUser, changeUserStatus };
