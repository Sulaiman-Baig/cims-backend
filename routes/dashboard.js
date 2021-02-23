var express = require('express');
var router = express.Router();
const dashboardController = require('../controllers/dashboard');



router.get('/enquiry-vs-admission/:campusId', dashboardController.enquiryVSadmission);
router.get('/today-inquiry-vs-admission/:campusId', dashboardController.todayEnquiryVSAdmission);
router.get('/week-inquiry-vs-admission/:campusId', dashboardController.weekEnquiryVSAdmission);
router.get('/month-inquiry-vs-admission/:campusId', dashboardController.monthEnquiryVSAdmission);
router.get('/no-of-upcoming-batches/:campusId', dashboardController.getNoOfUpcomingBatchesByCampus);
router.get('/next-starting-batch-date', dashboardController.getNextStartingBatchDate);
router.get('/no-of-followups', dashboardController.getNoOfFollowUps);
router.get('/no-of-month-inquiries', dashboardController.getNoOfMonthInquiries);
router.get('/no-of-inquiries-in-pipeline', dashboardController.getNoOfInquiriesInPipelines);
router.get('/no-of-month-admissions', dashboardController.getNoOfMonthAdmissions);
router.get('/all-courses', dashboardController.getAllCourses ); 



module.exports = router;