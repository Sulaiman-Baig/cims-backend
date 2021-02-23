const http_status_codes = require('http-status-codes');
const sequelize = require("sequelize");
const op = sequelize.Op;
var moment = require('moment');
const addSubtractDate = require("add-subtract-date");

const {

    Course,
    Inquiry,
    Admission,
    Batch
} = require('../database/database');
module.exports = {

    async todayEnquiryVSAdmission(req, res, next) {
        try {
            const TODAY_START = new Date().setHours(0, 0, 0, 0);
            const NOW = new Date();
            const campusId = req.params.campusId;
            const coursesWithAdmissions = await Course.findAll(
                {
                    include:
                        [
                            {
                                model: Admission, attributes: ['id'],
                                where: {
                                    [op.and]: [
                                        { campusId: campusId },
                                        {
                                            createdAt: {
                                                [op.gt]: new Date(TODAY_START),
                                                [op.lt]: NOW
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    , attributes: ['id', 'title']
                }
            );
            const coursesWithInquiries = await Course.findAll(
                {
                    include:
                        [
                            {
                                model: Inquiry, attributes: ['id'],
                                where: {
                                    [op.and]: [
                                        { campusId: campusId },
                                        {
                                            createdAt: {
                                                [op.gt]: new Date(TODAY_START),
                                                [op.lt]: NOW
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    , attributes: ['id', 'title']
                }
            );
            courseObjs = [];
            const coursesAll = await Course.findAll({ attributes: ['id', 'title'] });
            await coursesAll.forEach(course => {
                let obj = {
                    name: course.title,
                    series: [
                        {
                            name: 'Admission',
                            value: 0
                        },
                        {
                            name: 'Inquiries',
                            value: 0
                        }
                    ]
                }
                courseObjs.push(obj);
            });

            await coursesWithAdmissions.forEach(async course => {
                await courseObjs.forEach((courseObj, i) => {
                    if (course.title === courseObj.name) {
                        courseObj.series[0].value = course.admissions.length;
                    }
                });
            });
            await coursesWithInquiries.forEach(async course => {
                await courseObjs.forEach((courseObj, i) => {
                    if (course.title === courseObj.name) {
                        courseObj.series[1].value = course.inquiries.length;
                    }
                });
            });
            return res.status(http_status_codes.CREATED).json(courseObjs);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching todayEnquiryVSAdmission"
            });
        }
    },

    async weekEnquiryVSAdmission(req, res, next) {
        try {
            const campusId = req.params.campusId;
            const noOfDays = new Date().getDay();
            const coursesWithAdmissions = await Course.findAll(
                {
                    include:
                        [
                            {
                                model: Admission, attributes: ['id'],
                                where: {
                                    [op.and]: [
                                        { campusId: campusId },

                                        {
                                            createdAt: {
                                                [op.gte]: new Date(moment(addSubtractDate.subtract(new Date(), noOfDays, "days")).format("YYYY-MM-DD hh:mm:ss")),
                                                [op.lte]: moment(addSubtractDate.add(new Date(), 1, "day")).format("YYYY-MM-DD hh:mm:ss"),
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    , attributes: ['id', 'title']
                }
            );
            const coursesWithInquiries = await Course.findAll(
                {
                    include:
                        [
                            {
                                model: Inquiry, attributes: ['id'],
                                where: {
                                    [op.and]: [
                                        { campusId: campusId },

                                        {
                                            createdAt: {
                                                [op.gte]: new Date(moment(addSubtractDate.subtract(new Date(), noOfDays, "days")).format("YYYY-MM-DD hh:mm:ss")),
                                                [op.lte]: moment(addSubtractDate.add(new Date(), 1, "day")).format("YYYY-MM-DD hh:mm:ss"),
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    , attributes: ['id', 'title']
                }
            );

            courseObjs = [];
            const coursesAll = await Course.findAll({ attributes: ['id', 'title'] });
            await coursesAll.forEach(course => {
                let obj = {
                    name: course.title,
                    series: [
                        {
                            name: 'Admission',
                            value: 0
                        },
                        {
                            name: 'Inquiries',
                            value: 0
                        }
                    ]
                }
                courseObjs.push(obj);
            });

            await coursesWithAdmissions.forEach(async course => {
                await courseObjs.forEach((courseObj, i) => {
                    if (course.title === courseObj.name) {
                        courseObj.series[0].value = course.admissions.length;
                    }
                });
            });
            await coursesWithInquiries.forEach(async course => {
                await courseObjs.forEach((courseObj, i) => {
                    if (course.title === courseObj.name) {
                        courseObj.series[1].value = course.inquiries.length;
                    }
                });
            });
            return res.status(http_status_codes.CREATED).json(courseObjs);

        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching weekEnquiryVSAdmission"
            });
        }
    },

    async monthEnquiryVSAdmission(req, res, next) {
        try {
            const campusId = req.params.campusId;
            const noOfDays = new Date().getDate();
            const coursesWithAdmissions = await Course.findAll(
                {
                    include:
                        [
                            {
                                model: Admission, attributes: ['id'],
                                where: {
                                    [op.and]: [
                                        { campusId: campusId },
                                        {
                                            createdAt: {

                                                [op.gte]: new Date(moment(addSubtractDate.subtract(new Date(), (noOfDays - 1), "days")).format("YYYY-MM-DD hh:mm:ss")),
                                                [op.lte]: moment(addSubtractDate.add(new Date(), 1, "day")).format("YYYY-MM-DD hh:mm:ss"),
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    , attributes: ['id', 'title']
                }
            );
            const coursesWithInquiries = await Course.findAll(
                {
                    include:
                        [
                            {
                                model: Inquiry, attributes: ['id'],
                                where: {
                                    [op.and]: [
                                        { campusId: campusId },
                                        {
                                            createdAt: {

                                                [op.gte]: new Date(moment(addSubtractDate.subtract(new Date(), noOfDays, "days")).format("YYYY-MM-DD hh:mm:ss")),
                                                [op.lte]: moment(addSubtractDate.add(new Date(), 1, "day")).format("YYYY-MM-DD hh:mm:ss"),

                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    , attributes: ['id', 'title']
                }
            );
            courseObjs = [];
            const coursesAll = await Course.findAll({ attributes: ['id', 'title'] });
            await coursesAll.forEach(course => {
                let obj = {
                    name: course.title,
                    series: [
                        {
                            name: 'Admission',
                            value: 0
                        },
                        {
                            name: 'Inquiries',
                            value: 0
                        }
                    ]
                }
                courseObjs.push(obj);
            });

            await coursesWithAdmissions.forEach(async course => {
                await courseObjs.forEach((courseObj, i) => {

                    if (course.title === courseObj.name) {
                        courseObj.series[0].value = course.admissions.length;
                    }
                });
            });
            await coursesWithInquiries.forEach(async course => {
                await courseObjs.forEach((courseObj, i) => {

                    if (course.title === courseObj.name) {
                        courseObj.series[1].value = course.inquiries.length;
                    }
                });
            });
            return res.status(http_status_codes.CREATED).json(courseObjs);

        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching monthEnquiryVSAdmission"
            });
        }
    },

    async getNoOfUpcomingBatchesByCampus(req, res, next) {
        try {
            const upcomingbatches = await Batch.findAll({
                where: {
                    [op.and]: [
                        { batch_start_date: { [op.gt]: new Date() } },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            return res.status(http_status_codes.OK).json(upcomingbatches.length);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All UpcomingBatch"
            });
        }
    },

    async getNextStartingBatchDate(req, res, next) {
        try {

            var dates = [];
            const upcomingbatches = await Batch.findAll({
                where: {
                    batch_start_date: {
                        [op.gt]: new Date()
                    }
                },
                attributes: ['id', 'batch_start_date']
            });
            upcomingbatches.forEach(upcoming => {
                dates.push(upcoming.batch_start_date)
            });
            var minimumDate = new Date(Math.min.apply(null, dates));
            const minDate = moment(new Date(minimumDate)).format("YYYY-MM-DD hh:mm:ss")
            if (minDate === 'Invalid date') {
                return res.status(http_status_codes.OK).json({ nextStartingOn: 'No Upcoming Batch' });
            } else {
                return res.status(http_status_codes.OK).json({ nextStartingOn: minDate });
            }
           
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All UpcomingBatch"
            });
        }
    },

    async getNoOfFollowUps(req, res, next) {
        try {

            const TODAY_START = new Date().setHours(0, 0, 0, 0);
            const NOW = new Date();
            const inquiries = await Inquiry.findAll({
                where: {
                    next_follow_up_date: {
                        [op.gt]: new Date(TODAY_START),
                        [op.lt]: NOW
                    }
                },
                attributes: ['id']
            });
            return res.status(http_status_codes.OK).json(inquiries.length);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getNoOfFollowUps"
            });
        }
    },

    async getNoOfMonthInquiries(req, res, next) {
        try {
            const noOfDays = new Date().getDate();
            const inquiries = await Inquiry.findAll({
                where:
                {
                    createdAt: {
                        [op.gte]: moment(addSubtractDate.subtract(new Date(), noOfDays, "days")).format("YYYY-MM-DD hh:mm:ss"),
                        [op.lte]: moment(addSubtractDate.add(new Date(), 1, "day")).format("YYYY-MM-DD hh:mm:ss"),
                    }
                },
                attributes: ['id']
            });
            return res.status(http_status_codes.OK).json(inquiries.length);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getNoOfMonthInquiries"
            });
        }
    },

    async getNoOfMonthAdmissions(req, res, next) {
        try {
            const noOfDays = new Date().getDate();
            const admissions = await Admission.findAll({
                where:
                {
                    createdAt: {
                        [op.gte]: moment(addSubtractDate.subtract(new Date(), noOfDays, "days")).format("YYYY-MM-DD hh:mm:ss"),
                        [op.lte]: moment(addSubtractDate.add(new Date(), 1, "day")).format("YYYY-MM-DD hh:mm:ss"),
                    }
                },
                attributes: ['id']
            });
            return res.status(http_status_codes.OK).json(admissions.length);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getNoOfMonthAdmissions"
            });
        }
    },

    async getNoOfInquiriesInPipelines(req, res, next) {
        try {
            const inquiries = await Inquiry.findAll({
                where:
                {
                    [op.or]: [
                        { status: 'prospective' },
                        { status: 'need_analysis' },
                        { status: 'proposal' },
                        { status: 'negotiation' },
                    ]
                },
                attributes: ['id', 'status']
            });
            return res.status(http_status_codes.OK).json(inquiries.length);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getNoOfInquiriesInPipelines"
            });
        }
    },

    async getAllCourses(req, res, next) {
        try {
            courseObjs = [];
            const courses = await Course.findAll({ attributes: ['id', 'title'] });
            await courses.forEach(course => {
                let obj = {
                    name: course.title,
                    series: [
                        {
                            name: 'Admission',
                            value: 0
                        },
                        {
                            name: 'Inquiries',
                            value: 0
                        }
                    ]
                }
                courseObjs.push(obj);
            });


            return res.status(http_status_codes.OK).json(courseObjs);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Course"
            });
        }
    },

    async enquiryVSadmission(req, res, next) {
        try {
            courseObjs = [];
            const coursesAll = await Course.findAll({ attributes: ['id', 'title'] });
            await coursesAll.forEach(course => {
                let obj = {
                    name: course.title,
                    series: [
                        {
                            name: 'Admission',
                            value: 0
                        },
                        {
                            name: 'Inquiries',
                            value: 0
                        }
                    ]
                }
                courseObjs.push(obj);
            });
            const campusId = req.params.campusId;
            const coursesWithAdmissions = await Course.findAll({ include: [{ model: Admission, attributes: ['id'], where: { campusId: campusId } }], attributes: ['id', 'title'] });
            const coursesWithInquiries = await Course.findAll({ include: [{ model: Inquiry, attributes: ['id'], where: { campusId: campusId } }], attributes: ['id', 'title'] });

            await coursesWithAdmissions.forEach(async course => {
                await courseObjs.forEach((courseObj, i) => {

                    if (course.title === courseObj.name) {
                        courseObj.series[0].value = course.admissions.length;
                    }
                });
            });
            await coursesWithInquiries.forEach(async course => {
                await courseObjs.forEach((courseObj, i) => {

                    if (course.title === courseObj.name) {
                        courseObj.series[1].value = course.inquiries.length;
                    }
                });
            });
            return res.status(http_status_codes.CREATED).json(courseObjs);

        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching inquiryVSadmission"
            });
        }
    },







};