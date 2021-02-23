var express = require('express');
var router = express.Router();
const inquiryremarksController = require('../controllers/inquiryremarks');


router.post('/create-enquiry-remarks', inquiryremarksController.createInquiryRemarks );



module.exports = router;