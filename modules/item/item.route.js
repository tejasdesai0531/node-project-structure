var express = require('express');
var router = express.Router();

const validateRequest = require('../../middlewares/validate-request')

const {getItems} = require('./item.controller')

router.get('/', getItems)

module.exports = router;