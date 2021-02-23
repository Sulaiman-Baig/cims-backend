const http_status_codes = require('http-status-codes');
const sequelize = require("sequelize");
const op = sequelize.Op;

const {

    Campus
} = require('../database/database');
module.exports = {

    async createCampus(req, res, next) {
        try {

            const {
                name,
                city,
                alias,
                location,
                campus_inguration_date,
                remarks

            } = req.body;

            const campus = await Campus.create({

                name: name,
                city: city,
                alias: alias,
                location: location,
                campus_inguration_date: campus_inguration_date,
                remarks: remarks

            });
            return res.status(http_status_codes.CREATED).json(campus);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Campus"
            });
        }
    },

    async updateCampus(req, res, next) {
        try {

            const {
                name,
                city,
                alias,
                location,
                campus_inguration_date,
                remarks

            } = req.body;

            campusId = req.params.id;

            const campus = await Campus.update({

                name: name,
                city: city,
                alias: alias,
                location: location,
                campus_inguration_date: campus_inguration_date,
                remarks: remarks

            }, {
                where: {
                    id: campusId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Campus Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Campus"
            });
        }
    },

    async getCampus(req, res, next) {
        try {

            campusId = req.params.id;

            const campus = await Campus.findOne({ where: { id: campusId } });
            return res.status(http_status_codes.OK).json(campus);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Campus"
            });
        }
    },

    async getAllCampuses(req, res, next) {
        try {

            const campus = await Campus.findAll(
                {
                    // where: {
                    //     alias: { [op.ne]: 'CIFSD00' }
                    // }
                }
            );
            return res.status(http_status_codes.OK).json(campus);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Campus"
            });
        }
    },
    async getAllCampusesBadges(req, res, next) {
        try {

            const campus = await Campus.findAll(
                {
                    where: {
                        alias: { [op.ne]: 'CIFSD00' }
                    },
                    attributes: ['id']
                }
            );
            return res.status(http_status_codes.OK).json(campus.length);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Campus"
            });
        }
    },

    async getAllCampusesForDD(req, res, next) {
        try {

            const campus = await Campus.findAll(

                {
                    attributes: [
                        'id',
                        'name'
                    ],

                    where: {
                        alias: { [op.ne]: 'CIFSD00' }
                    }
                }

            );
            return res.status(http_status_codes.OK).json(campus);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Campus"
            });
        }
    },
    async getAllCampusesForDDToTransferCampus(req, res, next) {
        try {
            const campusId = req.params.campusId;
            const campus = await Campus.findAll(

                {
                    where: {
                        [op.and]:
                            [
                                { id: { [op.ne]: campusId } },
                                { alias: { [op.ne]: 'CIFSD00' } }
                            ]
                    },
                    attributes: [
                        'id',
                        'name'
                    ]
                }
            );
            return res.status(http_status_codes.OK).json(campus);

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Campus"
            });
        }
    },


    async deleteCampus(req, res, next) {
        try {

            campusId = req.params.id;

            const campus = await Campus.destroy({ where: { id: campusId } });
            return res.status(http_status_codes.OK).json({ message: 'Campus Deleted Successfully' });

        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Campus"
            });
        }
    }
};