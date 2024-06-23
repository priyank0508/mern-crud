const authService = require('../services/auth.services');

module.exports.register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkUser = await authService.checkUserExists(email);
    if (checkUser) {
      return res.send(errorResponse(statusCode.CONFLICT, message.auth.emailAlreadyExits));
    }
    const data = req.body;
    const registeredUser = await authService.register(data);
    delete registeredUser.password;

    return res.send(successResponse(statusCode.OK, message.auth.registerSuccess, registeredUser));
  } catch (err) {
    catchErrorHandler(err, req, res, next);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await authService.checkUserExists(email);
    if (!userData) {
      return res.send(errorResponse(statusCode.NOT_FOUND, message.auth.incorrectEmail));
    }
    const getLoginUserData = await authService.login(userData, password);
    if (getLoginUserData) {
      return res.send(successResponse(statusCode.OK, message.auth.loginSuccess, getLoginUserData));
    }
  } catch (err) {
    catchErrorHandler(err, req, res, next);
  }
};