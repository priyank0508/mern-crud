const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { getQueryOptions } = require('../utils/queryHandler');


const createAdminUser = async () => {

  const isAdminExist = await User.findOne({ email: 'admin@gmail.com', userType: 'Admin' })

  if (isAdminExist) {
    throw {
      statusCode: statusCode.CONFLICT,
      message: message.user.adminAlreadyExits,
    };
  }
  const password = await bcrypt.hash('admin@123', 10);
  const user = await User.create({
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@gmail.com',
    userType: 'Admin',
    password
  });
  if (user) {
    return { email: user.email, password: 'admin@123' };
  }
  throw {
    statusCode: statusCode.INTERNAL_SERVER_ERROR,
    message: message.commonMsg.somethingWentWrong,
  };
};

const getAllUsers = async (query) => {
  const { search, ...restQuery } = query;
  const { limit, skip, sort } = getQueryOptions(restQuery);
  let searchFilter = {};
  if (search) {
    const searchFields = ['firstName', 'lastName', 'email'];
    searchFilter['$or'] = searchFields.map((field) => ({
      [field]: { $regex: search.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), $options: 'i' },
    }));
  }
  const pipline = [
    { $match: searchFilter },
    { $sort: sort },
    { $skip: skip },
    { $limit: limit },
    { $project: { password: 0, tokens: 0 } }
  ]
  const allUsers = await User.aggregate([
    {
      $facet: {
        payload: pipline,
        count: [{ $match: searchFilter }, { $count: 'total' }]
      }
    }]);
  return allUsers
};

const getUserById = async (userId) => {
  const user = User.findOne({ _id: userId }).select('-passwords');
  return user;
};

const updateUser = async (id, userData) => {
  const user = await User.findOneAndUpdate({ _id: id }, { ...userData }, { new: true }).lean();
  if (user) {
    delete user.password;
    return user;
  }
  throw {
    statusCode: statusCode.INTERNAL_SERVER_ERROR,
    message: message.commonMsg.somethingWentWrong,
  };
};

const changeUserStatus = async (id) => {
  const isUserExist = await User.findOne({ _id: id })
  if (!isUserExist) {
    throw {
      statusCode: statusCode.BAD_REQUEST,
      message: message.user.adminAlreadyExits,
    };
  }
  const user = await User.findOneAndUpdate({ _id: id }, { status: isUserExist.status === 'Active' ? 'Deactive' : 'Active' }, { new: true });
  if (user) {
    return true;
  }
  throw {
    statusCode: statusCode.INTERNAL_SERVER_ERROR,
    message: message.user.notFound,
  };
};

const updateUserProfileImg = async (id, imgName) => {
  const user = await User.findOneAndUpdate({ _id: id }, { profileImage: imgName }, { new: true }).lean();
  if (user) {
    delete user.password;
    delete user.tokens;
    return user;
  }
  throw {
    statusCode: statusCode.INTERNAL_SERVER_ERROR,
    message: message.commonMsg.somethingWentWrong,
  };
};

module.exports = { createAdminUser, getAllUsers, getUserById, updateUser, changeUserStatus, updateUserProfileImg };
