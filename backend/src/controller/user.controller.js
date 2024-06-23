const fs = require('fs');
const path = require('path');
const userService = require('../services/user.services');
const { searchData } = require('../utils/queryHandler');

module.exports.getAllUsers = async (req, res, next) => {
  try {
    if (req.user.userType !== 'Admin') {
      console.log('user', req.user)
      return res.send(errorResponse(statusCode.UNAUTHORIZED, message.user.accessDenaied));
    }
    searchData(req.query);
    const allUser = await userService.getAllUsers(req.query);
    console.log('allUser :>> ', allUser);
    return res.send(successResponse(statusCode.OK, message.user.userGetSuccess, allUser[0]['payload'], allUser[0]['count'][0]['total']));
  } catch (err) {
    catchErrorHandler(err, req, res, next);
  }
};

module.exports.createAdminUser = async (req, res, next) => {
  try {
    const user = await userService.createAdminUser();
    return res.send(successResponse(statusCode.OK, message.user.adminCreateSuccess, user));
  } catch (err) {
    console.log('err', err)
    catchErrorHandler(err, req, res, next);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const getUser = await userService.getUserById(req.user._id);
    return res.send(successResponse(statusCode.OK, message.user.userGetSuccess, getUser));
  } catch (err) {
    catchErrorHandler(err, req, res, next);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { userId, ...userData } = req.body;
    const user = await userService.updateUser(userId, userData);
    if (user) {
      return res.send(successResponse(statusCode.OK, message.user.userUpdated, [user]));
    }
  } catch (err) {
    catchErrorHandler(err, req, res, next);
  }
};

module.exports.changeUserStatus = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await userService.changeUserStatus(userIdc);
    if (user) {
      return res.send(successResponse(statusCode.OK, message.user.userStatusChanges, []));
    }
  } catch (err) {
    console.log(err)
    catchErrorHandler(err, req, res, next);
  }
};

module.exports.updateProfileImg = async (req, res, next) => {
  try {
    const oldImage = req.body.oldImage;
    const userId = req.user._id;
    const uploadPath = __basedir + '/src/public/uploads/userProfileImg/';
    if (req.files) {
      let profileImage = req.files.profileImage;
      let fileName;
      console.log('profileImage', profileImage)
      if (profileImage) {
        if (profileImage.mimetype !== 'image/png' && profileImage.mimetype !== 'image/jpg' && profileImage.mimetype !== 'image/jpeg') {
          return res.send(errorResponse(statusCode.BAD_REQUEST, message.file.fileTypeInvalid));
        }
        if (profileImage.size >= 1024 * 1024 * 5) {
          // if getter then 5MB
          return res.send(errorResponse(statusCode.BAD_REQUEST, message.file.fileTooBig));
        }
        fileName = 'profile-image-' + Date.now() + path.extname(profileImage.name);
        profileImage.mv(uploadPath + fileName, function (err) {
          if (err) {
            return res.send(errorResponse(statusCode.BAD_REQUEST, message.file.fileUploadfailed));
          }
        });

        const updateImg = await userService.updateUserProfileImg(userId, fileName);
        if (oldImage) {
          fs.unlinkSync(uploadPath + oldImage);
        }
        return res.send(successResponse(statusCode.OK, message.user.profileImageUpdated, [updateImg]));
      }
    }
  } catch (err) {
    catchErrorHandler(err, req, res, next);
  }
};
