var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middleware/check-auth');

router.post('/create', userController.createUser);
router.post('/signin', userController.userSignin);
router.post('/update/:id', userController.updateuser);
//  router.post('/updatepassword/:id' , userController.updatepassword);
//  router.post('/resetpassword/:id' , userController.resetpassword);
//  router.post('/mailsend' , userController.resetpassword_usingmail);
//  router.get('/getbyId/:id' , userController.getbyId);
router.get('/users/:campusId', userController.getallByCampus);
router.get('/users-badges/:campusId', userController.getAllUsersBadgesByCampus);
//  router.get('/getallbyadmin/:id' , userController.getallbyadmin);

module.exports = router;
