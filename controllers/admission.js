const http_status_codes = require('http-status-codes');
var moment = require('moment');
const addSubtractDate = require("add-subtract-date");
const sequelize = require("sequelize");
const op = sequelize.Op;
const {

    Admission,
    Installment,
    Campus,
    Student,
    Batch,
    User,
    Employee,
    Course,
    AdmissionAcademicRecord
} = require('../database/database');
module.exports = {

    async createAdmission(req, res, next) {
        try {


            const {
                student_name,
                dob,
                nic,
                gender,
                nationality,
                personal_contact,
                guardian_contact,
                email,
                postal_address,
                admission_date,
                registeration_fee,
                fee_package,
                fee_package_after_discount,
                discount,
                is_installment,
                remarks,
                inquiryId,
                userId,
                campusId,
                batchId,
                courseId,
                student_academic_record,
                installments

            } = req.body;

            const admission = await Admission.create({
                student_name: student_name,
                nic: nic,
                dob: dob,
                gender: gender,
                nationality: nationality,
                personal_contact: personal_contact,
                guardian_contact: guardian_contact,
                email: email,
                postal_address: postal_address,
                admission_date: admission_date,
                registeration_fee: registeration_fee,
                fee_package: fee_package,
                fee_package_after_discount: fee_package_after_discount,
                discount: discount,
                is_installment: is_installment,
                remarks: remarks,
                inquiryId: inquiryId,
                userId: userId,
                campusId: campusId,
                batchId: batchId,
                courseId: courseId,
                courseStatus: 'In Progress'
            });

            const students = await Student.findAll();
            const campus = await Campus.findOne({ where: { id: campusId }, attributes: ['alias'] });
            const campusAliasFirstPart = campus.alias.slice(0, 5);
            const campusAliasSecondPart = campus.alias.slice(5);
            const batch = await Batch.findOne({ where: { id: batchId }, attributes: ['alias'] });
            const batchAlias = batch.alias.slice(8, 11);

            const fullYear = new Date().getUTCFullYear();
            const stringYear = fullYear.toString();
            const year = stringYear.slice(2);

            if (students.length === 0) {
                console.log('===0');
                const stdRegNo = campusAliasFirstPart + '-' + campusAliasSecondPart + year + '-' + '00001';
                const stdRlNo = campus.alias + '-' + batchAlias + '-' + year + '-' + '00001';
                const student = await Student.create({
                    registeration_no: stdRegNo,
                    roll_no: stdRlNo,
                    is_transfer: false,
                    status: 'current',
                    admissionId: admission.id,
                    student_no: 1
                });

                if (is_installment === true) {
                    installments.forEach(installment => {
                        Installment.create({
                            installment: installment.installment,
                            due_date: installment.due_date,
                            admissionId: admission.id,
                            status: 'Unpaid'
                        });
                    });
                }

                if (student_academic_record.length > 0) {
                    student_academic_record.forEach(record => {
                        AdmissionAcademicRecord.create({
                            certificate: record.certificate,
                            institute: record.institute,
                            year: record.year,
                            percentage: record.percentage,
                            studentId: student.id
                        });
                    });
                }


            } else if (students.length > 0) {

                const lastStudent = await Student.findAll({
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                });

                if (lastStudent[0].student_no <= 8) {
                    console.log('<8');
                    const stdRegNo = campusAliasFirstPart + '-' + campusAliasSecondPart + year + '-' + '0000' + (lastStudent[0].student_no + 1);
                    const stdRlNo = campus.alias + '-' + batchAlias + '-' + year + '-' + '0000' + (lastStudent[0].student_no + 1);
                    const student = await Student.create({
                        registeration_no: stdRegNo,
                        roll_no: stdRlNo,
                        is_transfer: false,
                        status: 'current',
                        admissionId: admission.id,
                        student_no: lastStudent[0].student_no + 1
                    });
                    if (is_installment === true) {
                        installments.forEach(installment => {
                            Installment.create({
                                installment: installment.installment,
                                due_date: installment.due_date,
                                admissionId: admission.id,
                                status: 'Unpaid'
                            });
                        });
                    }

                    if (student_academic_record.length > 0) {
                        student_academic_record.forEach(record => {
                            AdmissionAcademicRecord.create({
                                certificate: record.certificate,
                                institute: record.institute,
                                year: record.year,
                                percentage: record.percentage,
                                studentId: student.id
                            });
                        });
                    }

                } else if (lastStudent[0].student_no >= 9 && lastStudent[0].student_no <= 98) {
                    // console.log('>9');
                    const stdRegNo = campusAliasFirstPart + '-' + campusAliasSecondPart + year + '-' + '000' + (lastStudent[0].student_no + 1);
                    const stdRlNo = campus.alias + '-' + batchAlias + '-' + year + '-' + '000' + (lastStudent[0].student_no + 1);


                    const student = await Student.create({
                        registeration_no: stdRegNo,
                        roll_no: stdRlNo,
                        is_transfer: false,
                        status: 'current',
                        admissionId: admission.id,
                        student_no: lastStudent[0].student_no + 1
                    });

                } else if (lastStudent[0].student_no >= 99 && lastStudent[0].student_no <= 998) {
                    // console.log('>9');
                    const stdRegNo = campusAliasFirstPart + '-' + campusAliasSecondPart + year + '-' + '00' + (lastStudent[0].student_no + 1);
                    const stdRlNo = campus.alias + '-' + batchAlias + '-' + year + '-' + '00' + (lastStudent[0].student_no + 1);

                    const student = await Student.create({
                        registeration_no: stdRegNo,
                        roll_no: stdRlNo,
                        is_transfer: false,
                        status: 'current',
                        admissionId: admission.id,
                        student_no: lastStudent[0].student_no + 1
                    });

                    if (is_installment === true) {
                        installments.forEach(installment => {
                            Installment.create({
                                installment: installment.installment,
                                due_date: installment.due_date,
                                admissionId: admission.id,
                                status: 'Unpaid'
                            });
                        });
                    }

                    if (student_academic_record.length > 0) {
                        student_academic_record.forEach(record => {
                            AdmissionAcademicRecord.create({
                                certificate: record.certificate,
                                institute: record.institute,
                                year: record.year,
                                percentage: record.percentage,
                                studentId: student.id
                            });
                        });
                    }

                } else if (lastStudent[0].student_no >= 999 && lastStudent[0].student_no <= 9998) {
                    // console.log('>9');
                    const stdRegNo = campusAliasFirstPart + '-' + campusAliasSecondPart + year + '-' + '0' + (lastStudent[0].student_no + 1);
                    const stdRlNo = campus.alias + '-' + batchAlias + '-' + year + '-' + '0' + (lastStudent[0].student_no + 1);

                    const student = await Student.create({
                        registeration_no: stdRegNo,
                        roll_no: stdRlNo,
                        is_transfer: false,
                        status: 'current',
                        admissionId: admission.id,
                        student_no: lastStudent[0].student_no + 1
                    });

                    if (is_installment === true) {
                        installments.forEach(installment => {
                            Installment.create({
                                installment: installment.installment,
                                due_date: installment.due_date,
                                admissionId: admission.id,
                                status: 'Unpaid'
                            });
                        });
                    }

                    if (student_academic_record.length > 0) {
                        student_academic_record.forEach(record => {
                            AdmissionAcademicRecord.create({
                                certificate: record.certificate,
                                institute: record.institute,
                                year: record.year,
                                percentage: record.percentage,
                                studentId: student.id
                            });
                        });
                    }
                } else if (lastStudent[0].student_no >= 9999 && lastStudent[0].student_no <= 99998) {
                    // console.log('>9');
                    const stdRegNo = campusAliasFirstPart + '-' + campusAliasSecondPart + year + '-' + (lastStudent[0].student_no + 1);
                    const stdRlNo = campus.alias + '-' + batchAlias + '-' + year + '-' + (lastStudent[0].student_no + 1);

                    const student = await Student.create({
                        registeration_no: stdRegNo,
                        roll_no: stdRlNo,
                        is_transfer: false,
                        status: 'current',
                        admissionId: admission.id,
                        student_no: lastStudent[0].student_no + 1
                    });

                    if (is_installment === true) {
                        installments.forEach(installment => {
                            Installment.create({
                                installment: installment.installment,
                                due_date: installment.due_date,
                                admissionId: admission.id,
                                status: 'Unpaid'
                            });
                        });
                    }

                    if (student_academic_record.length > 0) {
                        student_academic_record.forEach(record => {
                            AdmissionAcademicRecord.create({
                                certificate: record.certificate,
                                institute: record.institute,
                                year: record.year,
                                percentage: record.percentage,
                                studentId: student.id
                            });
                        });
                    }
                }
            }


            return res.status(http_status_codes.CREATED).json({ message: 'Student Enrolled Successfullt' });
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Admission"
            });
        }
    },

    async enrollToAnotherCourse(req, res, next) {
        try {

            const studentId = req.params.studentId;
            const {

                admission_date,
                fee_package,
                fee_package_after_discount,
                discount,
                is_installment,
                remarks,
                inquiryId,
                userId,
                campusId,
                batchId,
                courseId,
                installments

            } = req.body;


            const student = await Student.findOne({ where: { id: studentId } });

            if (student) {              
                const admission = await Admission.create({
                    admission_date: admission_date,
                    fee_package: fee_package,
                    fee_package_after_discount: fee_package_after_discount,
                    discount: discount,
                    is_installment: is_installment,
                    remarks: remarks,
                    inquiryId: inquiryId,
                    userId: userId,
                    campusId: campusId,
                    batchId: batchId,
                    courseId: courseId,
                    studentId: student.id,
                    courseStatus: 'In Progress'
                });

                if (is_installment === true) {
                    installments.forEach(installment => {
                        Installment.create({
                            installment: installment.installment,
                            due_date: installment.due_date,
                            admissionId: admission.id,
                            status: 'Unpaid'
                        });
                    });
                }
                return res.status(http_status_codes.CREATED).json({ message: 'Student Enrolled Successfully', admission });
            }

        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating enrollToAnotherCourse"
            });
        }
    },

    async isStudentExistWithContactNo(req, res, next) {
        try {


            const student = await Admission.findOne({ where: { personal_contact: req.body.personal_contact }, attributes: ['id'] });

            if (student) {
                return res.json({ message: 'Student already exists with this contact no', isExist: true });
            } else {
                return res.json({ message: 'No sudent exists with this contact no', isExist: false });
            }


        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching isStudentExistWithContactNo"
            });
        }
    },

    async isStudentExistWithGuardianContactNo(req, res, next) {
        try {


            const student = await Admission.findOne({ where: { guardian_contact: req.body.guardian_contact }, attributes: ['id'] });

            if (student) {
                return res.json({ message: 'Student already exists with this guardian contact no', isExist: true });
            } else {
                return res.json({ message: 'No sudent exists with this guardian contact no', isExist: false });
            }
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching isStudentExistWithGuardianContactNo"
            });
        }
    },

    async isStudentExistWithEmail(req, res, next) {
        try {


            const student = await Admission.findOne({ where: { email: req.body.email }, attributes: ['id'] });

            if (student) {
                return res.json({ message: 'Student already exists with this email', isExist: true });
            } else {
                return res.json({ message: 'No sudent exists with this email', isExist: false });
            }
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching isStudentExistWithEmail"
            });
        }
    },

    async isStudentExistWithCNIC(req, res, next) {
        try {


            const student = await Admission.findOne({ where: { nic: req.body.nic }, attributes: ['id'] });

            if (student) {
                return res.json({ message: 'Student already exists with this nic', isExist: true });
            } else {
                return res.json({ message: 'No sudent exists with this nic', isExist: false });
            }
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching isStudentExistWithCNIC"
            });
        }
    },

    async getAllAdmissionsByCampus(req, res, next) {
        try {
            const admissions = await Admission.findAll(
                {
                    where: { campusId: req.params.campusId },
                    include: [
                        {
                            model: User,
                            attributes:
                                ['id'
                                ],
                            include: [
                                {
                                    model: Employee,
                                    attributes: [
                                        'id',
                                        'full_name'
                                    ]
                                }
                            ],
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
                            model: Student,
                            attributes: [
                                'id'
                            ]
                        }
                    ],
                    attributes: [
                        'id',
                        'student_name'
                    ]
                }
            );

            if (admissions.length > 0) {
                return res.json(admissions);
            } else {
                return res.json({ message: 'No admissions exist in this campus yet', isExist: false });
            }
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllAdmissionsByCampus"
            });
        }
    },

    async getAllTodaysAdmissionsByCampus(req, res, next) {
        try {
            const TODAY_START = new Date().setHours(1);
            const NOW = new Date();
            const admissions = await Admission.findAll(
                {
                    where: {
                        [op.and]:
                            [
                                { campusId: req.params.campusId },
                                {
                                    createdAt: {
                                        [op.and]:
                                            [
                                                { [op.gt]: new Date(TODAY_START), },
                                                { [op.lt]: NOW }
                                            ]
                                    }
                                }
                            ]
                    },
                    include: [
                        {
                            model: User,
                            attributes:
                                ['id'
                                ],
                            include: [
                                {
                                    model: Employee,
                                    attributes: [
                                        'id',
                                        'full_name'
                                    ]
                                }
                            ],
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
                            model: Student,
                            attributes: [
                                'id'
                            ]
                        }
                    ],
                    attributes: [
                        'id',
                        'student_name'
                    ]
                }
            );

            if (admissions.length > 0) {
                return res.json(admissions);
            } else {
                return res.json({ message: 'No admissions exist in this campus yet', isExist: false });
            }
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllAdmissionsByCampus"
            });
        }
    },

    async getAllThisMonthsAdmissionsByCampus(req, res, next) {
        try {
            const noOfDays = new Date().getDate();
            const admissions = await Admission.findAll(
                {
                    where: {
                        [op.and]:
                            [
                                { campusId: req.params.campusId },
                                {
                                    createdAt: {
                                        [op.and]:
                                            [
                                                { [op.gte]: new Date(moment(addSubtractDate.subtract(new Date(), (noOfDays - 1), "days")).format("YYYY-MM-DD hh:mm:ss")), },
                                                { [op.lte]: moment(addSubtractDate.add(new Date(), 1, "day")).format("YYYY-MM-DD hh:mm:ss") }
                                            ]
                                    }
                                }
                            ]
                    },
                    include: [
                        {
                            model: User,
                            attributes:
                                ['id'
                                ],
                            include: [
                                {
                                    model: Employee,
                                    attributes: [
                                        'id',
                                        'full_name'
                                    ]
                                }
                            ],
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
                            model: Student,
                            attributes: [
                                'id'
                            ]
                        }
                    ],
                    attributes: [
                        'id',
                        'student_name'
                    ]
                }
            );

            if (admissions.length > 0) {
                return res.json(admissions);
            } else {
                return res.json({ message: 'No admissions exist in this campus yet', isExist: false });
            }
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllAdmissionsByCampus"
            });
        }
    },

    async getAllThisYearsAdmissionsByCampus(req, res, next) {
        try {

            const noOfMonths = new Date().getMonth();
            const startOfMonth = new Date(moment(addSubtractDate.subtract(new Date(), (noOfMonths), "months")).format("YYYY-MM-DD hh:mm:ss"));
            const noOfDays = new Date().getDate();
            const startOfYear = new Date(moment(addSubtractDate.subtract(startOfMonth, (noOfDays - 1), "days")).format("YYYY-MM-DD hh:mm:ss"));

            const admissions = await Admission.findAll(
                {
                    where: {
                        [op.and]:
                            [
                                { campusId: req.params.campusId },
                                {
                                    createdAt: {
                                        [op.and]:
                                            [
                                                { [op.gte]: startOfYear },
                                                { [op.lte]: moment(addSubtractDate.add(new Date(), 1, "day")).format("YYYY-MM-DD hh:mm:ss") }
                                            ]
                                    }
                                }
                            ]
                    },
                    include: [
                        {
                            model: User,
                            attributes:
                                ['id'
                                ],
                            include: [
                                {
                                    model: Employee,
                                    attributes: [
                                        'id',
                                        'full_name'
                                    ]
                                }
                            ],
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
                            model: Student,
                            attributes: [
                                'id'
                            ]
                        }
                    ],
                    attributes: [
                        'id',
                        'student_name'
                    ]
                }
            );

            if (admissions.length > 0) {
                return res.json(admissions);
            } else {
                return res.json({ message: 'No admissions exist in this campus yet', isExist: false });
            }
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllAdmissionsByCampus"
            });
        }
    },

    async getAllAdmissionsBadgesByCampus(req, res, next) {
        try {

            const noOfMonths = new Date().getMonth();
            const startOfMonth = new Date(moment(addSubtractDate.subtract(new Date(), (noOfMonths), "months")).format("YYYY-MM-DD hh:mm:ss"));
            const noOfDaysOfMonth = new Date().getDate();
            const startOfYear = new Date(moment(addSubtractDate.subtract(startOfMonth, (noOfDaysOfMonth - 1), "days")).format("YYYY-MM-DD hh:mm:ss"));

            const yearadmissions = await Admission.findAll(
                {
                    where: {
                        [op.and]:
                            [
                                { campusId: req.params.campusId },
                                {
                                    createdAt: {
                                        [op.and]:
                                            [
                                                { [op.gte]: startOfYear },
                                                { [op.lte]: moment(addSubtractDate.add(new Date(), 1, "day")).format("YYYY-MM-DD hh:mm:ss") }
                                            ]
                                    }
                                }
                            ]
                    },
                    attributes: [
                        'id'
                    ]
                }
            );
            const noOfDays = new Date().getDate();
            const monthadmissions = await Admission.findAll(
                {
                    where: {
                        [op.and]:
                            [
                                { campusId: req.params.campusId },
                                {
                                    createdAt: {
                                        [op.and]:
                                            [
                                                { [op.gte]: new Date(moment(addSubtractDate.subtract(new Date(), (noOfDays - 1), "days")).format("YYYY-MM-DD hh:mm:ss")), },
                                                { [op.lte]: moment(addSubtractDate.add(new Date(), 1, "day")).format("YYYY-MM-DD hh:mm:ss") }
                                            ]
                                    }
                                }
                            ]
                    },
                    attributes: [
                        'id'
                    ]
                }
            );
            const TODAY_START = new Date().setHours(1);
            const NOW = new Date();
            const todayadmissions = await Admission.findAll(
                {
                    where: {
                        [op.and]:
                            [
                                { campusId: req.params.campusId },
                                {
                                    createdAt: {
                                        [op.and]:
                                            [
                                                { [op.gt]: new Date(TODAY_START), },
                                                { [op.lt]: NOW }
                                            ]
                                    }
                                }
                            ]
                    },
                    attributes: [
                        'id'
                    ]
                }
            );
            const alladmissions = await Admission.findAll(
                {
                    where: { campusId: req.params.campusId },
                    attributes: [
                        'id'
                    ]
                }
            );
            return res.json({
                alladmissions: alladmissions.length,
                todayadmissions: todayadmissions.length,
                monthadmissions: monthadmissions.length,
                yearadmissions: yearadmissions.length
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching getAllAdmissionsBadges"
            });
        }
    },









};