const { body } = require('express-validator');

const signUpValidator = [
    body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),

  // Validate the lastName field
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),

  // Validate the email field
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  // Validate the password field
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]


const loginValidator = [

  // Validate the email field
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),

  // Validate the password field
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
]


module.exports = {
    signUpValidator,
    loginValidator
}