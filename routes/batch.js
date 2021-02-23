var express = require('express');
var router = express.Router();
const batchController = require('../controllers/batch');


router.post('/create', batchController.createBatch);
// router.post('/update/:id', batchController.updateBatch );
// router.post('/delete/:id', batchController.deleteBatch );
// router.get('/get/:id', batchController.getBatch );
// router.get('/getall', batchController.getAllBatches );
router.get('/course-batches-dropdown/:courseId/:campusId', batchController.getAllBatchesByCourseAndCampus);
router.get('/upcoming/:campusId', batchController.getAllUpcomingBatchesByCampus);
router.get('/recentlystarted/:campusId', batchController.getAllRecentlyStartedBatchesByCampus);
router.get('/inprogress/:campusId', batchController.getAllInProgressBatchesByCampus);
router.get('/recentlyended/:campusId', batchController.getAllRecentlyEndedBatchesByCampus);
router.get('/ended/:campusId', batchController.getAllEndedBatchesByCampus);
router.get('/students-by-batch/:batchId', batchController.getAllStudentsByBatch);
router.get('/getall-batches-badges/:campusId', batchController.getAllBatchesBadgesByCampus);





module.exports = router;