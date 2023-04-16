var express = require('express');
var router = express.Router();

const validateRequest = require('../../middlewares/validate-request')

const {addBrand, updateBrand, getBrands} = require('./brand.controller')
const {brandValidator} = require('./brand.validator')

router.get('/', getBrands)
router.post('/', brandValidator, validateRequest, addBrand)
router.put('/:id', brandValidator, validateRequest, updateBrand)


module.exports = router;