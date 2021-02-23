const http_status_codes = require('http-status-codes');
const {

    InquiryRemarks,
    Inquiry
} = require('../database/database');
module.exports = {

    async createInquiryRemarks(req, res, next) {
        try {
            const {
                type,
                is_available,
                status,
                next_follow_up_date,
                probability,
                subject,
                remarks,
                userId,
                inquiryId
            } = req.body;
            console.log(req.body);
            const inquiryremarks = await InquiryRemarks.create({
                type: type,
                is_available: is_available,
                status: status,
                next_follow_up_date: next_follow_up_date,
                probability: probability,
                subject: subject,
                remarks: remarks,
                userId: userId,
                inquiryId: inquiryId
            });

            const inquiry = await Inquiry.update({
                status: status,
                next_follow_up_date: next_follow_up_date
            }, {
                where: {
                    id: inquiryId
                }
            });
            return res.status(http_status_codes.CREATED).json(inquiryremarks);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating inquiryremarks"
            });
        }
    },


};