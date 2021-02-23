const http_status_codes = require('http-status-codes');
const sequelize = require("sequelize");
const op = sequelize.Op;
const {

    Employee
} = require('../database/database');
module.exports = {

    async createEmployee(req, res, next) {
        try {

            const {
                title,
                designation,
                full_name,
                image,
                cnic,
                gender,
                religion,
                dob,
                personal_email,
                primary_mobile_no,
                other_mobile_no,
                home_ptcl,
                address,
                maritial_status,
                basic_salary,
                campusId
            } = req.body;
            // res.json(req.body);

            const employee = await Employee.create({

                title: title,
                designation: designation,
                full_name: full_name,
                image: image,
                cnic: cnic,
                gender: gender,
                religion: religion,
                dob: dob,
                personal_email: personal_email,
                primary_mobile_no: primary_mobile_no,
                other_mobile_no: other_mobile_no,
                home_ptcl: home_ptcl,
                address: address,
                maritial_status: maritial_status,
                basic_salary: basic_salary,
                campusId: campusId,
                isUser: false
            });

            return res.status(http_status_codes.CREATED).json(employee);

        } catch (err) {

            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Employee"
            });
        }
    },

    async updateEmployee(req, res, next) {
        try {

            const {
                title,
                designation,
                full_name,
                image,
                cnic,
                gender,
                religion,
                dob,
                personal_email,
                primary_mobile_no,
                other_mobile_no,
                home_ptcl,
                address,
                maritial_status,
                basic_salary,
                campusId
            } = req.body;

            employeeId = req.params.id;

            const employee = await Employee.update({
                title: title,
                designation: designation,
                full_name: full_name,
                image: image,
                cnic: cnic,
                gender: gender,
                religion: religion,
                dob: dob,
                personal_email: personal_email,
                primary_mobile_no: primary_mobile_no,
                other_mobile_no: other_mobile_no,
                home_ptcl: home_ptcl,
                address: address,
                maritial_status: maritial_status,
                basic_salary: basic_salary,
                campusId: campusId

            }, {
                where: {
                    id: employeeId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Employee Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Employee"
            });
        }
    },

    async getEmployee(req, res, next) {
        try {
            employeeId = req.params.id;
            const employee = await Employee.findOne({ where: { id: employeeId } });
            return res.status(http_status_codes.OK).json(employee);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Employee"
            });
        }
    },

    // async getAllEmployees(req, res, next) {
    //     try {
    //         const employee = await Employee.findAll({ where: { designation: { [op.not]: 'owner' } } });
    //         return res.status(http_status_codes.OK).json(employee);
    //     }
    //     catch (err) {
    //         return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
    //             message: "Error Occurd in Fetching All Employee"
    //         });
    //     }
    // },

    async getAllEmployeesByCampus(req, res, next) {

        try {
            const employee = await Employee.findAll({
                where: {
                    [op.and]: [
                        { designation: { [op.not]: 'owner' } },
                        { campusId: req.params.campusId }
                    ]
                }

            });
            return res.status(http_status_codes.OK).json(employee);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Employee"
            });
        }
    },

    async getAllEmployeesForDDByCampus(req, res, next) {
        try {
            const employee = await Employee.findAll(
                {
                    where: {
                        [op.and]: [
                            { designation: { [op.not]: 'owner' } },
                            { campusId: req.params.campusId }
                        ]
                    },
                    attributes: ['id', 'full_name']
                }
            );
            return res.status(http_status_codes.OK).json(employee);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Employee"
            });
        }
    },

    async getAllEmployeesBadgesByCampus(req, res, next) {
        try {
            const employee = await Employee.findAll({
                where: {
                    [op.and]: [
                        { designation: { [op.not]: 'owner' } },
                        { campusId: req.params.campusId }
                    ]
                }, attributes: ['id']
            });
            return res.status(http_status_codes.OK).json(employee.length);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Employee"
            });
        }
    },



    async getAllEmployeesForEmpToUserDD(req, res, next) {
        try {
            const employee = await Employee.findAll({
                where: {
                    [op.and]:
                        [
                            { designation: { [op.not]: 'owner' } },
                            { isUser: { [op.not]: true } }
                        ]

                }, attributes: ['id', 'full_name']
            });
            return res.status(http_status_codes.OK).json(employee);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Employee"
            });
        }
    },

    async getAllEmployeesForEmpToUserDDByCampus(req, res, next) {
        try {
            const employee = await Employee.findAll({
                where: {
                    [op.and]:
                        [
                            { designation: { [op.not]: 'owner' } },
                            { isUser: { [op.not]: true } },
                            { campusId: req.params.campusId }
                        ]

                }, attributes: ['id', 'full_name']
            });
            return res.status(http_status_codes.OK).json(employee);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Employee"
            });
        }
    },


    async deleteEmployee(req, res, next) {
        try {
            employeeId = req.params.id;
            const employee = await Employee.destroy({ where: { id: employeeId } });
            return res.status(http_status_codes.OK).json({ message: 'Employee Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Employee"
            });
        }
    }
};