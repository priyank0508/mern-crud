const Joi = require('@hapi/joi');
const register = {
  body: Joi.object().keys({
    firstName: Joi.string()
      .label('First Name')
      .min(3)
      .max(30)
      .required()
      .pattern(/^[a-zA-Z0-9, ]*$/)
      .messages({
        'string.pattern.base': '{{#label}} is only allowed to alphabet characters',
      }),
    lastName: Joi.string()
      .label('Last Name')
      .min(3)
      .max(30)
      .required()
      .pattern(/^[a-zA-Z0-9, ]*$/)
      .messages({
        'string.pattern.base': '{{#label}} is only allowed to alphabet characters',
      }),
    email: Joi.string().label('Email').email().required(),
    password: Joi.string().label('Password').min(5).required(),
    confirmPassword: Joi.string().label('confirm Password').min(5).valid(Joi.ref('password')).required().messages({
      'any.only': 'Password and confirm password must be same.',
    }),
  }),
};


const login = {
  body: Joi.object().keys({
    email: Joi.string().label('Email').email().required(),
    password: Joi.string().label('Password').min(5).required(),
  }),
};

module.exports = { register, login };
