var express = require('express');
var router = express.Router();
const imageController = require('../controllers/image');


router.post('/upload', imageController.uploadImage );



module.exports = router;