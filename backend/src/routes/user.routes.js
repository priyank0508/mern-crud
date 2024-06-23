const router = require('express').Router();
const { validate } = require('../utils/validate');
const userValidation = require('../validation/user.validation');
const { authMiddleware } = require('../middleware/auth.middleware');
const { getAllUsers, getUserById, createUser, updateUser, changeUserStatus, updateProfileImg, createAdminUser } = require('../controller/user.controller');

router.get('/create-admin-user', createAdminUser);
router.get('/get-users', authMiddleware, getAllUsers);
router.get('/get-users-by-id', authMiddleware, getUserById);
router.post('/update-user', validate(userValidation.updateUser), authMiddleware, updateUser);
router.post('/change-user-status', validate(userValidation.changeUserStatus), authMiddleware, changeUserStatus);
router.post('/update-user-profile-image', authMiddleware, updateProfileImg);

module.exports = router;
