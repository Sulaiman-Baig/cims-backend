const http_status_codes = require('http-status-codes');
const sequelize = require("sequelize");
const op = sequelize.Op;
const {


    Inquiry,
    Campus,
    Course,
    User,
    Employee,
    InquiryRemarks,
    InquiryTransfer,

} = require('../database/database');
module.exports = {

    async createInquiry(req, res, next) {
        try {
            const {

                full_name,
                contact,
                email,
                gender,
                country,
                city,
                area,
                possible_join_date,
                next_follow_up_date,
                marketing_source,
                probability,
                courseId,
                userId,
                campusId
            } = req.body;

            const inquiry = await Inquiry.create({
                is_transfer: false,
                status: "prospective",
                full_name: full_name,
                contact: contact,
                email: email,
                gender: gender,
                country: country,
                city: city,
                area: area,
                possible_join_date: possible_join_date,
                next_follow_up_date: next_follow_up_date,
                marketing_source: marketing_source,
                probability: probability,
                courseId: courseId,
                userId: userId,
                campusId: campusId
            });
            return res.status(http_status_codes.CREATED).json(inquiry);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Inquiry"
            });
        }
    },

    async updateInquiry(req, res, next) {
        try {
            const {
                description,
                title,
                imageUrl
            } = req.body;
            inquiryId = req.params.id;
            const inquiry = await Inquiry.update({
                title: title,
                description: description,
                imageUrl: imageUrl

            }, {
                where: {
                    id: inquiryId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Inquiry Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Inquiry"
            });
        }
    },

    async getInquiry(req, res, next) {
        try {
            inquiryId = req.params.id;
            const inquiry = await Inquiry.findOne({
                where: { id: inquiryId },
                include: [
                    { model: Course, attributes: ['id', 'title'] },
                    { model: Campus, attributes: ['id', 'name'] },
                    { model: User, include: { model: Employee }, },
                ]
            });
            return res.status(http_status_codes.OK).json(inquiry);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Inquiry"
            });
        }
    },

    async getAllInquiries(req, res, next) {
        try {
            const inquiries = await Inquiry.findAll();
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Inquiries"
            });
        }
    },

    async getAllProspectiveInquiriesByCampus(req, res, next) {
        try {
            const inquiries = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'prospective' },
                        { campusId: req.params.campusId }
                    ]
                },
                include: [
                    { model: Course, attributes: ['id', 'title'] },
                    { model: Campus, attributes: ['id', 'name'] }
                ]
            });
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All ProspectiveInquiries"
            });
        }
    },


    async getAllNeedAnalysisInquiriesByCampus(req, res, next) {
        try {
            const inquiries = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'need_analysis' },
                        { campusId: req.params.campusId }
                    ]
                },
                include: [
                    { model: Course, attributes: ['id', 'title'] },
                    { model: Campus, attributes: ['id', 'name'] }
                ]
            });
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All need_analysis Inquiries"
            });
        }
    },


    async getAllProposalInquiriesByCampus(req, res, next) {
        try {
            const inquiries = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'proposal' },
                        { campusId: req.params.campusId }
                    ]
                },
                include: [
                    { model: Course, attributes: ['id', 'title'] },
                    { model: Campus, attributes: ['id', 'name'] }
                ]
            });
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All proposal Inquiries"
            });
        }
    },


    async getAllNegotiationInquiriesByCampus(req, res, next) {
        try {
            const inquiries = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'negotiation' },
                        { campusId: req.params.campusId }
                    ]
                },
                include: [
                    { model: Course, attributes: ['id', 'title'] },
                    { model: Campus, attributes: ['id', 'name'] }
                ]
            });
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All negotiation Inquiries"
            });
        }
    },


    async getAllSuccessfullInquiriesByCampus(req, res, next) {
        try {
            const inquiries = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'successfull' },
                        { campusId: req.params.campusId }
                    ]
                },
                include: [
                    { model: Course, attributes: ['id', 'title'] },
                    { model: Campus, attributes: ['id', 'name'] }
                ]
            });
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All successfull Inquiries"
            });
        }
    },


    async getAllNotInterestedInquiriesByCampus(req, res, next) {
        try {
            const inquiries = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'not_interested' },
                        { campusId: req.params.campusId }
                    ]
                },
                include: [
                    { model: Course, attributes: ['id', 'title'] },
                    { model: Campus, attributes: ['id', 'name'] }
                ]
            });
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All not_interested Inquiries"
            });
        }
    },


    async getAllInquiryRemarks(req, res, next) {
        try {
            inquiryId = req.params.inquiryId;
            const inquiries = await InquiryRemarks.findAll({ where: { inquiryId: inquiryId }, include: { model: User, include: { model: Employee } } });
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Inquiry Remarks"
            });
        }
    },

    async getAllTodaysInquiriesByCampus(req, res, next) {
        try {

            const TODAY_START = new Date().setHours(1);
            const NOW = new Date();
            const inquiries = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        {
                            createdAt: {
                                [op.and]: [
                                    { [op.gt]: new Date(TODAY_START) },
                                    { [op.lt]: NOW }
                                ]
                            }
                        },
                        { campusId: req.params.campusId }
                    ]
                },
                include: [
                    { model: Course, attributes: ['id', 'title'] },
                    { model: Campus, attributes: ['id', 'name'] }
                ]
            });
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getAllTodaysInquiries"
            });
        }
    },


    async getAllFollowUpInquiriesByCampus(req, res, next) {
        try {

            const TODAY_START = new Date().setHours(0, 0, 0, 0);
            const NOW = new Date();
            const inquiries = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        {
                            next_follow_up_date: {
                                [op.and]: [
                                    { [op.gt]: new Date(TODAY_START) },
                                    { [op.lt]: NOW }
                                ]
                            }
                        },
                        { campusId: req.params.campusId }
                    ]
                },
                include: [
                    { model: Course, attributes: ['id', 'title'] },
                    { model: Campus, attributes: ['id', 'name'] }
                ]
            });
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getAllFollowUpInquiries"
            });
        }
    },

    async getAllFollowUpInquiriesCountByCampus(req, res, next) {
        try {

            const TODAY_START = new Date().setHours(0, 0, 0, 0);
            const NOW = new Date();
            const inquiries = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        {
                            next_follow_up_date: {
                                [op.and]: [
                                    { [op.gt]: new Date(TODAY_START) },
                                    { [op.lt]: NOW }
                                ]
                            }
                        },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            return res.status(http_status_codes.OK).json(inquiries.length);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getAllFollowUpInquiriesCount"
            });
        }
    },

    async getAllUpcomingFollowUpInquiriesByCampus(req, res, next) {
        try {
            const inquiries = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        {
                            next_follow_up_date: {
                                [op.and]: [
                                    { [op.gt]: new Date() }
                                ]
                            }
                        },
                        { campusId: req.params.campusId }
                    ]
                },
                include: [
                    { model: Course, attributes: ['id', 'title'] },
                    { model: Campus, attributes: ['id', 'name'] }
                ]
            });
            return res.status(http_status_codes.OK).json(inquiries);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getAllUpcomingFollowUpInquiries"
            });
        }
    },

    async getAllUpcomingFollowUpInquiriesCountByCampus(req, res, next) {
        try {
            const inquiries = await Inquiry.findAll({
                where: {
                    next_follow_up_date: {
                        [op.gt]: new Date()
                    }
                },
                where: {
                    [op.and]: [
                        {
                            next_follow_up_date: {
                                [op.and]: [
                                    { [op.gt]: new Date() }
                                ]
                            }
                        },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            return res.status(http_status_codes.OK).json(inquiries.length);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getAllUpcomingFollowUpInquiriesCount"
            });
        }
    },


    async getAllCampusesByCity(req, res, next) {
        try {
            const { city } = req.body;
            const campusesbycity = await Campus.findAll(
                {
                    where: {
                        [op.and]:
                            [
                                { city: city },
                                { alias: { [op.ne]: 'CIFSD00' } }
                            ]
                    },
                    attributes: ['id', 'name']
                });
            return res.status(http_status_codes.OK).json(campusesbycity);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Inquiries"
            });
        }
    },

    async deleteInquiry(req, res, next) {
        try {
            inquiryId = req.params.id;
            const inquiry = await Inquiry.destroy({ where: { id: inquiryId } });
            return res.status(http_status_codes.OK).json({ message: 'Inquiry Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Inquiry"
            });
        }
    },

    async transferInquiry(req, res, next) {
        try {
            const {

                status,
                reason,
                inquiryId,
                userId,
                campusFromId,
                campusToId,
                remarks
            } = req.body;

            const transferInquiry = await InquiryTransfer.create({
                status: status,
                reason: reason,
                inquiryId: inquiryId,
                userId: userId,
                campusFromId: campusFromId,
                campusToId: campusToId,
                remarks: remarks
            });

            const inquiry = await Inquiry.update({
                is_transfer: true,
                campusId: campusToId
            }, { where: { id: inquiryId } });

            return res.status(http_status_codes.CREATED).json(transferInquiry);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Inquiry"
            });
        }
    },
    async getAllEnquiriesBadgesByCampus(req, res, next) {
        try {
            const TODAY_START = new Date().setHours(1);
            const NOW = new Date();
            const today = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        {
                            createdAt: {
                                [op.and]: [
                                    { [op.gt]: new Date(TODAY_START) },
                                    { [op.lt]: NOW }
                                ]
                            }
                        },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            const TODAY_start = new Date().setHours(0, 0, 0, 0);
            const now = new Date();
            const followup = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        {
                            next_follow_up_date: {
                                [op.and]: [
                                    { [op.gt]: new Date(TODAY_start) },
                                    { [op.lt]: now }
                                ]
                            }
                        },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            const prospective = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'prospective' },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            const need_analysis = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'need_analysis' },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            const proposal = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'proposal' },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            const negotiation = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'negotiation' },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            const successfull = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'successfull' },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            const not_interested = await Inquiry.findAll({
                where: {
                    [op.and]: [
                        { status: 'not_interested' },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            return res.status(http_status_codes.OK).json(

                {
                    today: today.length,
                    followup: followup.length,
                    prospective: prospective.length,
                    need_analysis: need_analysis.length,
                    proposal: proposal.length,
                    negotiation: negotiation.length,
                    successfull: successfull.length,
                    not_interested: not_interested.length
                }
            );
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getAllEnquiriesBadges Inquiries"
            });
        }
    },
};