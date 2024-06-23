const Joi = require('@hapi/joi');
const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const getQueryOptions = (query) => {
  const page = Number(query.page * 1) || 1;
  const direction = Number(query.sortDirection);
  const limit = Number(query.limit * 1) || 10;
  const skip = page ? (Number(page) - 1) * limit : 0;

  let sort = {};
  if (query.sort) {
    sort[query.sort] = direction;
  } else {
    sort = { createdAt: -1 };
  }
  return { limit, skip, sort, page };
};

const searchData = async (data) => {
  const schema = Joi.object({
    sort: Joi.string().allow(''),
    sortDirection: Joi.string().allow(''),
    limit: Joi.string().allow(''),
    page: Joi.string().allow(''),
    search: Joi.string().allow(''),
  });
  const { error } = schema.validate(data, options);
  if (error) {
    throw {
      statusCode: statusCode.badRequest,
      message: error.details[0].message,
    };
  }
};

module.exports = { getQueryOptions, searchData };
