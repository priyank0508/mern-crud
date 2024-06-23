require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { catchErrorHandler } = require('../utils/errorHandler');

const authMiddleware = async (req, res, next) => {
  try {
    let Authorization = req.headers.authorization;

    if (req.params.token) {
      Authorization = `Bearer ${req.params.token}`;
    }
    if (Authorization) {
      Authorization = Authorization.split('Bearer ')[1];
      if (!Authorization) {
        return res.send(errorResponse(statusCode.UNAUTHORIZED, message.jwtToken.tokenRequired, []));
      }
      const secretKey = process.env.SECRET_KEY;
      const verificationResponse = await jwt.verify(Authorization, secretKey);
      const userId = verificationResponse._id;
      const findUser = await User.findOne({ _id: userId }).lean();
      req.user = findUser;
      next()
    } else {
      return res.send(errorResponse(statusCode.UNAUTHORIZED, message.jwtToken.tokenRequired, []));
    }
  } catch (error) {
    catchErrorHandler(error, req, res, next);
  }
};

module.exports = { authMiddleware };
