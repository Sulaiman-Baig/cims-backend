const http_status_codes = require('http-status-codes');
const {

    Course,
    Category
} = require('../database/database');
module.exports = {

    async createCourse(req, res, next) {
        try {
            const {
                title,
                alias,
                fee_package,
                duration_in_weeks,
                image,
                course_brief,
                learning_out_comes,
                target_audience,
                prerequisite,
                categoryId
            } = req.body;

            const course = await Course.create({
                title: title,
                alias: alias,
                fee_package: fee_package,
                duration_in_weeks: duration_in_weeks,
                image: image,
                course_brief: course_brief,
                learning_out_comes: learning_out_comes,
                target_audience: target_audience,
                prerequisite: prerequisite,
                categoryId: categoryId,
                is_featured: false,
                is_trending: false
            });
            return res.status(http_status_codes.CREATED).json(course);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Course"
            });
        }
    },

    async updateCourse(req, res, next) {
        try {
            const {
                title,
                alias,
                fee_package,
                duration_in_weeks,
                image,
                course_brief,
                learning_out_comes,
                target_audience,
                prerequisite,
                categoryId,
                is_featured,
                is_trending
            } = req.body;
            courseId = req.params.id;
            const course = await Course.update({
                title: title,
                alias: alias,
                fee_package: fee_package,
                duration_in_weeks: duration_in_weeks,
                image: image,
                course_brief: course_brief,
                learning_out_comes: learning_out_comes,
                target_audience: target_audience,
                prerequisite: prerequisite,
                categoryId: categoryId,
                is_featured: is_featured,
                is_trending: is_trending

            }, {
                where: {
                    id: courseId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Course Updated Successfully'
            });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Course"
            });
        }
    },

    async getCourse(req, res, next) {
        try {
            courseId = req.params.id;
            const course = await Course.findOne({ where: { id: courseId } });
            return res.status(http_status_codes.OK).json(course);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Course"
            });
        }
    },

    async getAllCourses(req, res, next) {
        try {
            const courses = await Course.findAll({ include: { model: Category } });
            return res.status(http_status_codes.OK).json(courses);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Course"
            });
        }
    },

    async getAllCoursesBadges(req, res, next) {
        try {
            const courses = await Course.findAll({ attributes: ['id'] });
            const category = await Category.findAll({ attributes: ['id'] });
            return res.status(http_status_codes.OK).json({noOfcourses: courses.length, noOfcategories: category.length});
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All getAllCoursesBadges"
            });
        }
    },

    async getAllCoursesForDD(req, res, next) {
        try {
            const courses = await Course.findAll({ attributes: ['id', 'title'] });
            return res.status(http_status_codes.OK).json(courses);
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Course"
            });
        }
    },


    async deleteCourse(req, res, next) {
        try {
            courseId = req.params.id;
            const course = await Course.destroy({ where: { id: courseId } });
            return res.status(http_status_codes.OK).json({ message: 'Course Deleted Successfully' });
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Course"
            });
        }
    }
};