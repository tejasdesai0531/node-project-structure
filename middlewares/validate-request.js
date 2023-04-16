const { validationResult } = require('express-validator')

const validateRequest = (req, res, next) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).send({
            message: 'Form fields required',
            errors: errors.errors
        })
    }

    next()
}

module.exports = validateRequest