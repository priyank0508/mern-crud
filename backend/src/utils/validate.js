const Joi = require('@hapi/joi');
const { pick } = require('lodash');

module.exports.validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .allow('')
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(',')
      .replace(/['"]+/g, '');

    return res.send(errorResponse(statusCode.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};
