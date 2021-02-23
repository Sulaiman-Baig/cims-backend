const http_status_codes = require('http-status-codes');
const sequelize = require('sequelize');
const op = sequelize.Op;
const {
    Admission,
    Student,
    StudentTransfer,
    AdmissionAcademicRecord,
    Installment,
    Inquiry,
    User,
    Employee,
    Campus,
    Batch,
    Course

} = require('../database/database');
module.exports = {

    async getAllStudentByCampus(req, res, next) {
        try {
            const students = await Student.findAll({
                include:
                    [
                        {
                            model: Admission,
                            where: {
                                campusId: req.params.campusId
                            },
                            attributes: ['id',
                                'student_name',
                                'nic',
                                'personal_contact',
                                'guardian_contact']
                        }
                    ],
                attributes: ['id',
                    'registeration_no',
                    'roll_no',
                    'status']
            });
            return res.status(http_status_codes.OK).json(students);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in Fetching  getAllStudent'
            });
        }
    },

    async getStudentById(req, res, next) {
        try {

            const studentId = req.params.studentId;
            const student = await Student.findOne({
                where: { id: studentId },
                include:
                    [
                        {
                            model: Admission
                        }
                    ]
            });
            return res.status(http_status_codes.OK).json(student);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in Fetching  getStudentById'
            });
        }
    },

    async getStudentAcademicRecord(req, res, next) {
        try {

            const studentId = req.params.studentId;

            const records = await AdmissionAcademicRecord.findAll({ where: { studentId: studentId } })
            return res.status(http_status_codes.OK).json(records);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in Fetching  getStudentAcademicRecord'
            });
        }
    },

    async getAllCoursesByStudent(req, res, next) {
        try {
            courses = []
            const admissionId = req.params.admissionId;

            const studentId = req.params.studentId;
            const firstCourse = await Student.findOne({
                where: { id: studentId },
                attributes: ['id'],
                include: [
                    {
                        model: Admission,
                        attributes:
                            ['id',
                                'fee_package',
                                'fee_package_after_discount',
                                'discount',
                                'discount',
                                'courseStatus',
                                'createdAt'
                            ],
                        include: [
                            {
                                model: Inquiry,
                                attributes: [
                                    'id',
                                    'full_name'
                                ]
                            },
                            {
                                model: User,
                                include: [
                                    {
                                        model: Employee,
                                        attributes: [
                                            'id',
                                            'full_name'
                                        ]
                                    }],
                                attributes: ['id']
                            },
                            {
                                model: Campus,
                                attributes: [
                                    'id',
                                    'name'
                                ]
                            },
                            {
                                model: Batch,
                                attributes: [
                                    'id',
                                    'alias'
                                ]
                            },
                            {
                                model: Course,
                                attributes: [
                                    'id',
                                    'title'
                                ]
                            },
                            {
                                model: Installment,
                                attributes: [
                                    'id',
                                    'installment',
                                    'due_date',
                                    'status'
                                ]
                            },
                        ],
                    }
                ]
            });

            let obj = {
                'id': firstCourse.admission.id,
                'fee_package': firstCourse.admission.fee_package,
                'fee_package_after_discount': firstCourse.admission.fee_package_after_discount,
                'discount': firstCourse.admission.discount,
                'courseStatus': firstCourse.admission.courseStatus,
                'createdAt': firstCourse.admission.createdAt,
                'inquiry': firstCourse.admission.inquiry,
                'user': firstCourse.admission.user,
                'campus': firstCourse.admission.campus,
                'batch': firstCourse.admission.batch,
                'course': firstCourse.admission.course,
                'installments': firstCourse.admission.installments
            }

            const otherCourses = await Admission.findAll(
                {
                    where: { studentId: studentId },
                    include: [
                        {
                            model: Inquiry,
                            attributes: [
                                'id',
                                'full_name'
                            ]
                        },
                        {
                            model: User,
                            include: [
                                {
                                    model: Employee,
                                    attributes: [
                                        'id',
                                        'full_name']
                                }
                            ],
                            attributes: ['id']
                        },
                        {
                            model: Campus,
                            attributes: [
                                'id',
                                'name'
                            ]
                        },
                        {
                            model: Batch,
                            attributes: [
                                'id',
                                'alias'
                            ]
                        },
                        {
                            model: Course,
                            attributes: [
                                'id',
                                'title'
                            ]
                        },
                        {
                            model: Installment
                            , attributes: [
                                'id',
                                'installment',
                                'due_date',
                                'status'
                            ]
                        },
                    ],
                    attributes: [
                        'id',
                        'fee_package',
                        'fee_package_after_discount',
                        'discount',
                        'discount',
                        'courseStatus',
                        'createdAt'
                    ]
                }
            );
            courses.push(obj);
            otherCourses.forEach(course => {
                courses.push(course);
            });
            return res.status(http_status_codes.OK).json(courses);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in Fetching  getAllCoursesByStudent'
            });
        }
    },

    async collectInstallment(req, res, next) {
        try {

            const installmentId = req.params.installmentId;
            const installment = await Installment.update(
                {
                    status: 'Paid'
                },
                {
                    where: { id: installmentId },
                });
            return res.status(http_status_codes.OK).json({ message: 'Installment Collected Successfully' });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in collectInstallment'
            });
        }
    },

    async batchTransfer(req, res, next) {
        try {

            // const installmentId = req.params.installmentId;
            // const installment = await Installment.update(
            //     {
            //         status: 'Paid'
            //     },
            //     {
            //         where: { id: installmentId },
            //     });
            // return res.status(http_status_codes.OK).json({ message: 'Installment Collected Successfully' });

        }
        catch (err) {
            // return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
            //     message: 'Error Occurd in collectInstallment'
            // });
        }
    },

    async campusTransfer(req, res, next) {
        try {
            // const installmentId = req.params.installmentId;
            // const installment = await Installment.update(
            //     {
            //         status: 'Paid'
            //     },
            //     {
            //         where: { id: installmentId },
            //     });
            // return res.status(http_status_codes.OK).json({ message: 'Installment Collected Successfully' });

        }
        catch (err) {
            // return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
            //     message: 'Error Occurd in collectInstallment'
            // });
        }
    },

    async concludeCourse(req, res, next) {
        try {

            const courseAdmissionId = req.params.courseAdmissionId;
            const courseStatus = await Admission.update(
                {
                    courseStatus: 'Concluded'
                },
                {
                    where: { id: courseAdmissionId },
                });
            return res.status(http_status_codes.OK).json({ message: 'Course Concluded Successfully' });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in concludeCourse'
            });
        }
    },

    async notCompletedCourse(req, res, next) {
        try {
            const courseAdmissionId = req.params.courseAdmissionId;
            const courseStatus = await Admission.update(
                {
                    courseStatus: 'Not Completed'
                },
                {
                    where: { id: courseAdmissionId },
                });
            return res.status(http_status_codes.OK).json({ message: 'Course Not Completed Successfully' });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in notCompletedCourse'
            });
        }
    },

    async suspendCourse(req, res, next) {
        try {
            const courseAdmissionId = req.params.courseAdmissionId;
            const courseStatus = await Admission.update(
                {
                    courseStatus: 'Suspended'
                },
                {
                    where: { id: courseAdmissionId },
                });
            return res.status(http_status_codes.OK).json({ message: 'Course Suspended Successfully' });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in suspendCourse'
            });
        }
    },

    async resumeCourse(req, res, next) {
        try {

            const courseAdmissionId = req.params.courseAdmissionId;
            const courseStatus = await Admission.update(
                {
                    courseStatus: 'In Progress'
                },
                {
                    where: { id: courseAdmissionId },
                });
            return res.status(http_status_codes.OK).json({ message: 'Course Resumed Successfully' });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in resumeCourse'
            });
        }
    },

    async freezeCourse(req, res, next) {
        try {

            const courseAdmissionId = req.params.courseAdmissionId;
            const courseStatus = await Admission.update(
                {
                    courseStatus: 'Freezed'
                },
                {
                    where: { id: courseAdmissionId },
                });
            return res.status(http_status_codes.OK).json({ message: 'Course Freezed Successfully' });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in collectInstallment'
            });
        }
    },

    async unfreezeCourse(req, res, next) {
        try {
            const courseAdmissionId = req.params.courseAdmissionId;
            const courseStatus = await Admission.update(
                {
                    courseStatus: 'In Progress'
                },
                {
                    where: { id: courseAdmissionId },
                });
            return res.status(http_status_codes.OK).json({ message: 'Course Unfreezed Successfully' });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in freezeCourse'
            });
        }
    },

    async getAllBatchesToTransferBatch(req, res, next) {
        try {
            const {
                courseId,
                batchId,
                campusId
            } = req.body;

            const batches = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            {
                                id:
                                {
                                    [op.ne]:
                                        batchId
                                }
                            },
                            {
                                campusId:
                                {
                                    [op.eq]:
                                        campusId
                                }
                            },
                            {
                                courseId:
                                {
                                    [op.eq]:
                                        courseId
                                }
                            }
                        ]
                },
                attributes:
                    [
                        'id',
                        'alias'
                    ]
            });
            return res.status(http_status_codes.OK).json(batches);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in getAllBatchesToTransferBatch'
            });
        }
    },

    async getAllBatchesToTransferCampus(req, res, next) {
        try {
            const {
                campusId
            } = req.body;
            const studentId = req.params.studentId;
            const student = await Student.findOne(
                {
                    where:
                        { id: studentId },
                    attributes: ['admissionId']
                }
            );
            const admission = await Admission.findOne(
                {
                    where:
                        { id: student.admissionId },
                    attributes: [
                        'batchId',
                        'courseId'
                    ]
                }
            );
            const batches = await Batch.findAll({
                where: {
                    [op.and]:
                        [
                            {
                                id:
                                {
                                    [op.ne]:
                                        admission.batchId
                                }
                            },
                            {
                                campusId:
                                {
                                    [op.eq]:
                                        campusId
                                }
                            },
                            {
                                courseId:
                                {
                                    [op.eq]:
                                        admission.courseId
                                }
                            }
                        ]
                },
                attributes:
                    [
                        'id',
                        'alias'
                    ]
            });
            return res.status(http_status_codes.OK).json(batches);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in getAllBatchesToTransferBatch'
            });
        }
    },

    async getAllCampusesToTransferCampus(req, res, next) {
        try {
            const studentId = req.params.studentId;
            const student = await Student.findOne(
                {
                    where:
                        { id: studentId },
                    attributes: ['admissionId']
                }
            );
            const admission = await Admission.findOne(
                {
                    where:
                        { id: student.admissionId },
                    attributes: [
                        'campusId'
                    ]
                }
            );
            const campuses = await Campus.findAll({
                where: {
                    [op.and]:
                        [
                            {
                                id:
                                {
                                    [op.ne]:
                                        admission.campusId
                                }
                            }
                        ]
                },
                attributes:
                    [
                        'id',
                        'alias',
                        'name'
                    ]
            });
            return res.status(http_status_codes.OK).json(campuses);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in getAllCampusesToTransferCampus'
            });
        }
    },

    async transferBatch(req, res, next) {
        try {
            const courseAdmissionId = req.params.courseAdmissionId;
            const {
                reason,
                remarks,
                batchId,
                batchToId,
                userId
            } = req.body;
            const transferdBatch = await StudentTransfer.create({
                reason: reason,
                remarks: remarks,
                batchId: batchId,
                batchToId: batchToId,
                userId: userId,
                admissionId: courseAdmissionId,
                type: 'Batch'
            });
            const admission = await Admission.update(
                {
                    batchId: batchToId
                },
                {
                    where: {
                        id: courseAdmissionId
                    }
                }
            );
            return res.status(http_status_codes.OK).json({ message: 'Batch Transferd Successfully' });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in transferBatch'
            });
        }
    },

    async transferCampus(req, res, next) {
        try {
            const courseAdmissionId = req.params.courseAdmissionId;
            const {
                reason,
                remarks,
                batchId,
                batchToId,
                campusId,
                campusToId,
                userId
            } = req.body;
            const transferdBatch = await StudentTransfer.create({
                reason: reason,
                remarks: remarks,
                batchId: batchId,
                batchToId: batchToId,
                campusId: campusId,
                campusToId: campusToId,
                userId: userId,
                admissionId: courseAdmissionId,
                type: 'Campus'
            });
            const admission = await Admission.update(
                {
                    batchId: batchToId,
                    campusId: campusToId
                },
                {
                    where: {
                        id: courseAdmissionId
                    }
                }
            );
            return res.status(http_status_codes.OK).json({ message: 'Campus Transferd Successfully' });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in transferCampus'
            });
        }
    },

    async getAllFreezedStudentsByCampus(req, res, next) {
        try {
            const campusId = req.params.campusId;
            freezed_students = [];
            const admissions = await Admission.findAll(
                {
                    where: {
                        [op.and]:
                            [
                                { courseStatus: 'Freezed' },
                                { campusId: campusId }
                            ]
                    },
                    attributes: ['id', 'studentId'],
                    include: [{ model: Student }]
                }
            );
            admissions.forEach(async admission => {
                if (admission.studentId !== null) {
                    const student = await Student.findOne({
                        where: {
                            admissionId: admission.id
                        }
                    });
                    freezed_students.push(student);
                } else if (admission.studentId === null) {
                    // freezed_students.push(admission.students[0]);
                }
            });
            return res.status(http_status_codes.OK).json(freezed_students);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in getAllFreezedStudentsByCampus'
            });
        }
    },

    async createFeeSlip(req, res, next) {
        try {
            const installmentId = req.params.installmentId;
            const installment = await Installment.findOne({
                where: { id: installmentId },
                include: [
                    {
                        model: Admission,
                        attributes: [
                            'id',
                            'student_name',
                            'fee_package',
                            'fee_package_after_discount',
                            'discount',
                            'studentId',
                            'discount',
                            'courseStatus',
                            'createdAt'
                        ],
                        include: [
                            {
                                model: Inquiry,
                                attributes: [
                                    'id',
                                    'full_name'
                                ]
                            },
                            {
                                model: User,
                                include: [
                                    {
                                        model: Employee,
                                        attributes: [
                                            'id',
                                            'full_name'
                                        ]
                                    }],
                                attributes: ['id']
                            },
                            {
                                model: Campus,
                                attributes: [
                                    'id',
                                    'name'
                                ]
                            },
                            {
                                model: Batch,
                                attributes: [
                                    'id',
                                    'alias'
                                ]
                            },
                            {
                                model: Course,
                                attributes: [
                                    'id',
                                    'title'
                                ]
                            },
                            {
                                model: Student
                            }
                        ]
                    }
                ]
            });

            if (installment.admission.student_name === null) {
                const student = await Student.findOne({
                    where: { id: installment.admission.studentId }
                });
                const name = await Admission.findOne({
                    where: { id: student.admissionId }, attributes: ['student_name'], include: [{ model: Student }]
                });
                return res.status(http_status_codes.OK).json({ installment: installment, nameNotNull: name });
            }
            return res.status(http_status_codes.OK).json({ installment: installment });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: 'Error Occurd in Fetching  getStudentById'
            });
        }
    },

};