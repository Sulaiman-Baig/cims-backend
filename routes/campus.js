var express = require('express');
var router = express.Router();
const campusController = require('../controllers/campus');


router.post('/create', campusController.createCampus);
router.post('/update/:id', campusController.updateCampus);
router.post('/delete/:id', campusController.deleteCampus);
router.get('/get/:id', campusController.getCampus);
router.get('/getall', campusController.getAllCampuses);
router.get('/getall-campuses-badges', campusController.getAllCampusesBadges);
router.get('/campuses-dropdown', campusController.getAllCampusesForDD);
router.get('/campuses-dropdown-to-transfer-campus/:campusId', campusController.getAllCampusesForDDToTransferCampus);



module.exports = router;