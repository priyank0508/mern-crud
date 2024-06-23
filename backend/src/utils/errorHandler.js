
module.exports.catchErrorHandler = (error, req, res, next) => {
  try {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.send(errorResponse(status, message));
  } catch (error) {
    next(error);
  }
};
