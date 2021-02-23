var express = require('express');
var router = express.Router();
const employeeController = require('../controllers/employee');


router.post('/create', employeeController.createEmployee );
router.post('/update/:id', employeeController.updateEmployee );
router.post('/delete/:id', employeeController.deleteEmployee );
router.get('/get/:id', employeeController.getEmployee );
router.get('/employees/:campusId', employeeController.getAllEmployeesByCampus );
router.get('/employees-dropdown/:campusId', employeeController.getAllEmployeesForDDByCampus );
router.get('/getall-employees-badges/:campusId', employeeController.getAllEmployeesBadgesByCampus );
router.get('/employees-dropdown-emp-usr/:campusId', employeeController.getAllEmployeesForEmpToUserDDByCampus );



module.exports = router;