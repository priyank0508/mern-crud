const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (data) => {
  try {
    const token = jwt.sign(data, SECRET_KEY, {
      expiresIn: '24h',
    });
    return token;
  } catch (err) {
    return res.send(errorResponse(statusCode.UNAUTHORIZED, err.message));
  }
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (err) {
    return res.send(errorResponse(statusCode.UNAUTHORIZED, err.message));
  }
};

module.exports = { generateToken, decodeToken };
