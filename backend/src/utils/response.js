const successResponse = (statusCode, message, data = [], count) => {
  if (!Array.isArray(data)) {
    data = [data];
  }
  return {
    status: true,
    statusCode: statusCode || statusCode.OK,
    message: message,
    count: count ? count : 0,
    data: data,
  };
};

const errorResponse = (statusCode, message) => {
  return {
    status: false,
    statusCode: statusCode || statusCode.INTERNAL_SERVER_ERROR,
    message: message,
    count: 0,
    data: [],
  };
};

module.exports = { successResponse, errorResponse };
