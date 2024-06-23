const bcrypt = require('bcrypt');
const { generateToken } = require('../helper/jwt');
const User = require('../models/user.model');

const checkUserExists = async (email) => {
  const user = await User.findOne({ email: email }).lean();
  if (user) {
    return user;
  }
  return false;
};

const register = async (userData) => {
  const { password, ...restObj } = userData;
  const hashedPassword = await bcrypt.hash(password, 10)
  const saveData = await User.create({ ...restObj, password: hashedPassword });
  return saveData
};

const login = async (userData, password) => {
  if (userData.status == 'Deactivated' || userData.status == 'Suspended') {
    throw {
      statusCode: statusCode.BAD_REQUEST,
      message: msg.auth.blockedUser,
    };
  }

  const isPasswordValid = await bcrypt.compare(password, userData.password);

  if (!isPasswordValid) {
    throw {
      statusCode: statusCode.CONFLICT,
      message: message.auth.incorrectPassword,
    };
  }

  const generateUserToken = await generateToken({ _id: userData._id });

  delete userData.password;
  return { ...userData, token: generateUserToken };
};

module.exports = {
  checkUserExists,
  register,
  login,
};
