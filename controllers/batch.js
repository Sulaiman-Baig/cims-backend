const http_status_codes = require('http-status-codes');
const addSubtractDate = require("add-subtract-date");
const DateDiff = require('date-diff');
const sequelize = require("sequelize");
var moment = require('moment');
const op = sequelize.Op;
const {

    Admission,
    Batch,
    Campus,
    Student,
    Course,
    Employee,
    User
} = require('../database/database');
module.exports = {

    // without campus
    // async createBatch(req, res, next) {
    //     try {

    //         const {
    //             title,
    //             batch_time,
    //             batch_start_date,
    //             no_of_seats,
    //             remarks,
    //             courseId,
    //             userId,
    //             employeeId,
    //             campusId
    //         } = req.body;

    //         const campus = await Campus.findOne({ where: { id: campusId } });
    //         const course = await Course.findOne({ where: { id: courseId } });
    //         const batches = await Batch.findAll({ where: { courseId: courseId } });

    //         const fullYear = new Date().getUTCFullYear();
    //         const stringYear = fullYear.toString();
    //         const year = stringYear.slice(2);


    //         const batch_ending_date = addSubtractDate.subtract(new Date(batch_start_date), course.duration_in_weeks, "weeks");
    //         const recently_started_date = addSubtractDate.subtract(new Date(batch_start_date), 2, "weeks");
    //         const recently_ended_date = addSubtractDate.subtract(new Date(batch_ending_date), 2, "weeks");
    //         if (batches.length === 0) {

    //             let batchAlias = campus.alias + "-" + course.alias + "01" + "-" + year;

    //             const batch = await Batch.create({
    //                 title: title,
    //                 alias: batchAlias,
    //                 batch_time: batch_time,
    //                 batch_start_date: batch_start_date,
    //                 batch_ending_date: batch_ending_date,
    //                 recently_started_date: recently_started_date,
    //                 recently_ended_date: recently_ended_date,
    //                 no_of_seats: no_of_seats,
    //                 remarks: remarks,
    //                 userId: userId,
    //                 employeeId: employeeId,
    //                 campusId: campusId,
    //                 courseId: courseId,
    //                 batch_no: 1
    //             });
    //             return res.status(http_status_codes.CREATED).json(userId);

    //         }
    //          else if (batches.length > 0) {

    //             const lastBatch = await Batch.findAll({
    //                 where: { courseId: courseId },
    //                 limit: 1,
    //                 order: [['createdAt', 'DESC']]
    //             });

    //             if (lastBatch[0].batch_no <= 8) {

    //                 let batchAlias = campus.alias + "-" + course.alias + "0" + (lastBatch[0].batch_no + 1) + "-" + year;
    //                 const batch = await Batch.create({
    //                     title: title,
    //                     alias: batchAlias,
    //                     batch_time: batch_time,
    //                     batch_start_date: batch_start_date,
    //                     batch_ending_date: batch_ending_date,
    //                     recently_started_date: recently_started_date,
    //                     recently_ended_date: recently_ended_date,
    //                     no_of_seats: no_of_seats,
    //                     remarks: remarks,
    //                     userId: userId,
    //                     employeeId: employeeId,
    //                     campusId: campusId,
    //                     courseId: courseId,
    //                     batch_no: lastBatch[0].batch_no + 1
    //                 });
    //                 return res.status(http_status_codes.CREATED).json(batch);
    //             } else if (lastBatch[0].batch_no >= 9) {
    //                 let batchAlias = campus.alias + "-" + course.alias + (lastBatch[0].batch_no + 1) + "-" + year;
    //                 const batch = await Batch.create({
    //                     title: title,
    //                     alias: batchAlias,
    //                     batch_time: batch_time,
    //                     batch_start_date: batch_start_date,
    //                     batch_ending_date: batch_ending_date,
    //                     recently_started_date: recently_started_date,
    //                     recently_ended_date: recently_ended_date,
    //                     no_of_seats: no_of_seats,
    //                     remarks: remarks,
    //                     userId: userId,
    //                     employeeId: employeeId,
    //                     campusId: campusId,
    //                     courseId: courseId,
    //                     batch_no: lastBatch[0].batch_no + 1
    //                 });
    //                 return res.status(http_status_codes.CREATED).json(batch);
    //             }
    //         }
    //     } catch (err) {
    //         return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
    //             message: "Error Occurd in Creating Batch"
    //         });
    //     }
    // },

    async createBatch(req, res, next) {
        try {

            const {
                title,
                batch_time,
                batch_start_date,
                no_of_seats,
                remarks,
                courseId,
                userId,
                employeeId,
                campusId
            } = req.body;


            const campus = await Campus.findOne({ where: { id: campusId } });
            const course = await Course.findOne({ where: { id: courseId } });
            const batches = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            { campusId: campusId },
                            { courseId: courseId }
                        ]
                },
            });

            const fullYear = new Date().getUTCFullYear();
            const stringYear = fullYear.toString();
            const year = stringYear.slice(2);


            const batch_ending_date = addSubtractDate.subtract(new Date(batch_start_date), course.duration_in_weeks, "weeks");
            const recently_started_date = addSubtractDate.subtract(new Date(batch_start_date), 2, "weeks");
            const recently_ended_date = addSubtractDate.subtract(new Date(batch_ending_date), 2, "weeks");

            if (batches.length === 0) {

                let batchAlias = campus.alias + "-" + course.alias + "01" + "-" + year;

                const batch = await Batch.create({
                    title: title,
                    alias: batchAlias,
                    batch_time: batch_time,
                    batch_start_date: batch_start_date,
                    batch_ending_date: batch_ending_date,
                    recently_started_date: recently_started_date,
                    recently_ended_date: recently_ended_date,
                    no_of_seats: no_of_seats,
                    remarks: remarks,
                    userId: userId,
                    employeeId: employeeId,
                    campusId: campusId,
                    courseId: courseId,
                    batch_no: 1
                });
                return res.status(http_status_codes.CREATED).json(batch);

            } else if (batches.length > 0) {

                const lastBatch = await Batch.findAll({
                    where: {
                        [op.and]:
                            [
                                { campusId: campusId },
                                { courseId: courseId }
                            ]
                    },
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                });

                if (lastBatch[0].batch_no <= 8) {

                    let batchAlias = campus.alias + "-" + course.alias + "0" + (lastBatch[0].batch_no + 1) + "-" + year;
                    const batch = await Batch.create({
                        title: title,
                        alias: batchAlias,
                        batch_time: batch_time,
                        batch_start_date: batch_start_date,
                        batch_ending_date: batch_ending_date,
                        recently_started_date: recently_started_date,
                        recently_ended_date: recently_ended_date,
                        no_of_seats: no_of_seats,
                        remarks: remarks,
                        userId: userId,
                        employeeId: employeeId,
                        campusId: campusId,
                        courseId: courseId,
                        batch_no: lastBatch[0].batch_no + 1
                    });
                    return res.status(http_status_codes.CREATED).json(batch);
                } else if (lastBatch[0].batch_no >= 9) {
                    let batchAlias = campus.alias + "-" + course.alias + (lastBatch[0].batch_no + 1) + "-" + year;
                    const batch = await Batch.create({
                        title: title,
                        alias: batchAlias,
                        batch_time: batch_time,
                        batch_start_date: batch_start_date,
                        batch_ending_date: batch_ending_date,
                        recently_started_date: recently_started_date,
                        recently_ended_date: recently_ended_date,
                        no_of_seats: no_of_seats,
                        remarks: remarks,
                        userId: userId,
                        employeeId: employeeId,
                        campusId: campusId,
                        courseId: courseId,
                        batch_no: lastBatch[0].batch_no + 1
                    });
                    return res.status(http_status_codes.CREATED).json(batch);
                }
            }
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Batch"
            });
        }
    },

    async updateBatch(req, res, next) {
        try {
            const {
                title,
                alias,
                batch_time,
                batch_start_date,
                batch_ending_date,
                recently_ended_date,
                recently_started_date,
                no_of_seats,
                remarks,
                courseId,
                userId,
                employeeId,
                campusId,
                batch_no
            } = req.body;
            BatchId = req.params.id;
            const Batch = await Batch.update({
                title: title,
                alias: alias,
                batch_time: batch_time,
                batch_start_date: batch_start_date,
                batch_ending_date: batch_ending_date,
                recently_started_date: recently_started_date,
                recently_ended_date: recently_ended_date,
                no_of_seats: no_of_seats,
                remarks: remarks,
                userId: userId,
                employeeId: employeeId,
                campusId: campusId,
                courseId: courseId,
                batch_no: batch_no

            }, {
                where: {
                    id: BatchId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Batch Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Batch"
            });
        }
    },

    async getBatch(req, res, next) {
        try {
            batchId = req.params.id;
            const batch = await Batch.findOne({ where: { id: batchId } });
            return res.status(http_status_codes.OK).json(batch);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Batch"
            });
        }
    },

    async getAllBatches(req, res, next) {
        try {
            const batches = await Batch.findAll();
            return res.status(http_status_codes.OK).json(batches);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Batch"
            });
        }
    },

    async getAllBatchesBadgesByCampus(req, res, next) {
        try {
            const upcoming = await Batch.findAll({
                where: {
                    [op.and]: [
                        { batch_start_date: { [op.gt]: new Date() } },
                        { campusId: req.params.campusId }
                    ]
                },
                attributes: ['id']
            });
            const recentlystarted = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            { batch_start_date: { [op.lte]: new Date() } },
                            { recently_started_date: { [op.gte]: new Date() } },
                            { campusId: req.params.campusId }

                        ]
                },
                attributes: ['id']
            });
            const inprogress = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            { batch_ending_date: { [op.gt]: new Date() } },
                            { recently_started_date: { [op.lt]: new Date() } },
                            { campusId: req.params.campusId }
                        ]
                },
                attributes: ['id']
            });
            const recentlyended = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            { batch_ending_date: { [op.lte]: new Date() } },
                            { recently_ended_date: { [op.gte]: new Date() } },
                            { campusId: req.params.campusId }
                        ]
                },
                attributes: ['id']
            });
            const ended = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            { campusId: req.params.campusId },
                            { recently_ended_date: { [op.lt]: new Date() } }
                        ]
                },
                attributes: ['id']
            });
            return res.status(http_status_codes.OK).json({
                upcoming: upcoming.length,
                recentlystarted: recentlystarted.length,
                inprogress: inprogress.length,
                recentlyended: recentlyended.length,
                ended: ended.length
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllBatchesBadges"
            });
        }
    },

    async getAllBatchesByCourseAndCampus(req, res, next) {
        try {
            const courseId = req.params.courseId;
            const campusId = req.params.campusId;
            const batches = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            { courseId: courseId },
                            { campusId: campusId },
                        ]
                },
                attributes: ['id', 'alias']
            });
            return res.status(http_status_codes.OK).json(batches);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Batch"
            });
        }
    },



    async getAllEndedBatchesByCampus(req, res, next) {
        try {
            const ended = await Batch.findAll({
                where: {
                    [op.and]:
                        [

                            { campusId: req.params.campusId },
                            { recently_ended_date: { [op.lt]: new Date() } }
                        ]
                },
                include: [
                    {
                        model: Course,
                        attributes: ['title']
                    },
                    {
                        model: User,
                        attributes: ['username'],
                        include: {
                            model: Employee,
                            attributes: ['full_name']
                        }
                    },
                    {
                        model: Employee,
                        attributes: ['full_name']
                    }
                ]
            });
            return res.status(http_status_codes.OK).json(ended);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All UpcomingBatch"
            });
        }
    },

    async getAllStudentsByBatch(req, res, next) {
        try {
            students = [];
            const studentsFromDB = await Admission.findAll({
                where: {
                    batchId: req.params.batchId
                },
                include: [
                    {
                        model: Student,

                    },
                ],
                attributes: ['id']
            });
            studentsFromDB.forEach(student => {
                if (student.students.length > 0) {
                    students.push(student.students);
                }
            });
            return res.status(http_status_codes.OK).json(students);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getAllStudentsByBatch"
            });
        }
    },


    async getAllRecentlyEndedBatchesByCampus(req, res, next) {
        try {
            const recentlyended = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            { batch_ending_date: { [op.lte]: new Date() } },
                            { recently_ended_date: { [op.gte]: new Date() } },
                            { campusId: req.params.campusId }
                        ]
                },
                include: [
                    {
                        model: Course,
                        attributes: ['title']
                    },
                    {
                        model: User,
                        attributes: ['username'],
                        include: {
                            model: Employee,
                            attributes: ['full_name']
                        }
                    },
                    {
                        model: Employee,
                        attributes: ['full_name']
                    }
                ]
            });
            return res.status(http_status_codes.OK).json(recentlyended);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All UpcomingBatch"
            });
        }
    },

    async getAllInProgressBatchesByCampus(req, res, next) {
        try {
            const inprogress = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            { batch_ending_date: { [op.gt]: new Date() } },
                            { recently_started_date: { [op.lt]: new Date() } },
                            { campusId: req.params.campusId }
                        ]
                },
                include: [
                    {
                        model: Course,
                        attributes: ['title']
                    },
                    {
                        model: User,
                        attributes: ['username'],
                        include: {
                            model: Employee,
                            attributes: ['full_name']
                        }
                    },
                    {
                        model: Employee,
                        attributes: ['full_name']
                    }
                ]
            });
            return res.status(http_status_codes.OK).json(inprogress);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All UpcomingBatch"
            });
        }
    },

    async getAllRecentlyStartedBatchesByCampus(req, res, next) {
        try {
            const recentlystarted = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            { batch_start_date: { [op.lte]: new Date() } },
                            { recently_started_date: { [op.gte]: new Date() } },
                            { campusId: req.params.campusId }
                        ]
                },
                include: [
                    {
                        model: Course,
                        attributes: ['title']
                    },
                    {
                        model: User,
                        attributes: ['username'],
                        include: {
                            model: Employee,
                            attributes: ['full_name']
                        }
                    },
                    {
                        model: Employee,
                        attributes: ['full_name']
                    }
                ]
            });
            return res.status(http_status_codes.OK).json(recentlystarted);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All UpcomingBatch"
            });
        }
    },

    async getAllUpcomingBatchesByCampus(req, res, next) {
        try {
            const upcomingbatches = await Batch.findAll({
                where: {
                    [op.and]: [
                        { batch_start_date: { [op.gt]: new Date() } },
                        { campusId: req.params.campusId }
                    ]
                },
                include: [
                    {
                        model: Course,
                        attributes: ['title']
                    },
                    {
                        model: User,
                        attributes: ['username'],
                        include: {
                            model: Employee,
                            attributes: ['full_name']
                        }
                    },
                    {
                        model: Employee,
                        attributes: ['full_name']
                    }
                ]
            });
            return res.status(http_status_codes.OK).json(upcomingbatches);
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
            return res.status(http_status_codes.OK).json({ nextStartingOn: minDate });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All UpcomingBatch"
            });
        }
    },


    async deleteBatch(req, res, next) {
        try {
            batchId = req.params.id;
            const batch = await Batch.destroy({ where: { id: batchId } });
            return res.status(http_status_codes.OK).json({ message: 'Batch Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Batch"
            });
        }
    }
};