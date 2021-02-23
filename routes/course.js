var express = require('express');
var router = express.Router();
const courseController = require('../controllers/course');


router.post('/create', courseController.createCourse );
router.post('/update/:id', courseController.updateCourse );
router.post('/delete/:id', courseController.deleteCourse );
router.get('/get/:id', courseController.getCourse );
router.get('/getall', courseController.getAllCourses );
router.get('/getall-courses-badges', courseController.getAllCoursesBadges); 
router.get('/courses-dropdown', courseController.getAllCoursesForDD ); 



module.exports = router;