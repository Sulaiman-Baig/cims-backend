var express = require('express');
var router = express.Router();
const inquiryController = require('../controllers/inquiry');


router.post('/create', inquiryController.createInquiry);
// router.post('/update/:id', inquiryController.updateInquiry );
// router.post('/delete/:id', inquiryController.deleteInquiry );
router.get('/get/:id', inquiryController.getInquiry );
router.get('/getall', inquiryController.getAllInquiries );
router.get('/remarks/:inquiryId', inquiryController.getAllInquiryRemarks );
router.get('/todays/:campusId', inquiryController.getAllTodaysInquiriesByCampus);
router.get('/followup/:campusId', inquiryController.getAllFollowUpInquiriesByCampus);
router.get('/followup-count/:campusId', inquiryController.getAllFollowUpInquiriesCountByCampus);
router.get('/followup-upcoming/:campusId', inquiryController.getAllUpcomingFollowUpInquiriesByCampus);
router.get('/followup-upcoming-count/:campusId', inquiryController.getAllUpcomingFollowUpInquiriesCountByCampus);
router.get('/prospective/:campusId', inquiryController.getAllProspectiveInquiriesByCampus);
router.get('/need_analysis/:campusId', inquiryController.getAllNeedAnalysisInquiriesByCampus);
router.get('/proposal/:campusId', inquiryController.getAllProposalInquiriesByCampus);
router.get('/negotiation/:campusId', inquiryController.getAllNegotiationInquiriesByCampus);
router.get('/successfull/:campusId', inquiryController.getAllSuccessfullInquiriesByCampus);
router.get('/not_interested/:campusId', inquiryController.getAllNotInterestedInquiriesByCampus);
router.get('/getall-enquiries-badges/:campusId', inquiryController.getAllEnquiriesBadgesByCampus);
router.post('/transfer_inquiry', inquiryController.transferInquiry);
router.post('/campuses-by-city', inquiryController.getAllCampusesByCity);




module.exports = router;