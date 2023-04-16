const { body } = require('express-validator');

const brandValidator = [
    body('code')
    .trim()
    .notEmpty()
    .withMessage('Code is required'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
]

module.exports = {
    brandValidator
}