var express = require('express');
var router = express.Router();
const studentController = require('../controllers/student');



router.get('/getall/:campusId', studentController.getAllStudentByCampus);
router.get('/get/:studentId', studentController.getStudentById);
router.get('/academic-record/:studentId', studentController.getStudentAcademicRecord);
router.get('/courses-by-student/:studentId', studentController.getAllCoursesByStudent);
router.get('/collect-installment/:installmentId', studentController.collectInstallment);
router.get('/batch-transfer/:courseAdmissionId', studentController.batchTransfer);
router.get('/campus-transfer/:courseAdmissionId', studentController.campusTransfer);
router.get('/conclude-course/:courseAdmissionId', studentController.concludeCourse);
router.get('/not-completed-course/:courseAdmissionId', studentController.notCompletedCourse);
router.get('/suspend-course/:courseAdmissionId', studentController.suspendCourse);
router.get('/resume-course/:courseAdmissionId', studentController.resumeCourse);
router.get('/freeze-course/:courseAdmissionId', studentController.freezeCourse);
router.get('/unfreeze-course/:courseAdmissionId', studentController.unfreezeCourse);
router.get('/freezed-students-by-campus/:campusId', studentController.getAllFreezedStudentsByCampus);
router.get('/create-fee-slip/:installmentId', studentController.createFeeSlip);
router.post('/all-batches-to-transfer-batch', studentController.getAllBatchesToTransferBatch);
router.post('/all-batches-to-transfer-campus/:studentId', studentController.getAllBatchesToTransferCampus);
router.get('/all-campuses-to-transfer-campus/:studentId', studentController.getAllCampusesToTransferCampus);
router.post('/transfer-batch/:courseAdmissionId', studentController.transferBatch);
router.post('/transfer-campus/:courseAdmissionId', studentController.transferCampus);



module.exports = router;
