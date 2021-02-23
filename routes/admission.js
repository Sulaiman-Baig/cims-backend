var express = require('express');
var router = express.Router();
const admissionController = require('../controllers/admission');


router.post('/create', admissionController.createAdmission);
router.post('/enroll/:studentId', admissionController.enrollToAnotherCourse);
router.post('/is-student-exist-with-contact-no', admissionController.isStudentExistWithContactNo);
router.post('/is-student-exist-with-guardian-contact-no', admissionController.isStudentExistWithGuardianContactNo);
router.post('/is-student-exist-with-email', admissionController.isStudentExistWithEmail);
router.post('/is-student-exist-with-CNIC', admissionController.isStudentExistWithCNIC);
router.get('/all-admissions-by-campus/:campusId', admissionController.getAllAdmissionsByCampus);
router.get('/all-todays-admissions-by-campus/:campusId', admissionController.getAllTodaysAdmissionsByCampus);
router.get('/all-thismonths-admissions-by-campus/:campusId', admissionController.getAllThisMonthsAdmissionsByCampus);
router.get('/all-thisyears-admissions-by-campus/:campusId', admissionController.getAllThisYearsAdmissionsByCampus);
router.get('/getall-admissions-badges/:campusId', admissionController.getAllAdmissionsBadgesByCampus);



module.exports = router;