var express = require('express');
var router = express.Router();

const validateRequest = require('../../middlewares/validate-request')

const authController = require('./auth.controller')
const authValidator = require('./auth.validator')

router.post('/login', authValidator.loginValidator, validateRequest, authController.login)
router.post('/signup', authValidator.signUpValidator, validateRequest, authController.signup)


module.exports = router;