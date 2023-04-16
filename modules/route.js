var express = require('express');
var router = express.Router();

const authCheck = require('../middlewares/auth.middleware')

const authRouter = require('./auth/auth.route')
const brandRouter = require('./brand/brand.route')

router.use('/auth', authRouter)
router.use('/brand', authCheck, brandRouter)

module.exports = router;