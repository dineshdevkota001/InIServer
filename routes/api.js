var express = require('express');
var router = express.Router();

const image = require('./api/image')
const mesh = require('./api/mesh')
const user = require('./api/user')

/* GET home page. */
router.use('/image', image);
router.use('/mesh',mesh);
router.use('/user',user);

module.exports = router;
