const router = require('express').Router();
const { validate } = require('../utils/validate');
const authValidation = require('../validation/auth.validation');
const { register, login } = require('../controller/auth.controller');

router.post('/register', validate(authValidation.register), register);
router.post('/login', validate(authValidation.login), login);

module.exports = router;
