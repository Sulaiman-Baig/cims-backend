var express = require('express');
var router = express.Router();
const uploadController = require('../controllers/upload');


router.post('/upload', uploadController.uploadImage );




module.exports = router;