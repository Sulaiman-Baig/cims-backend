const http_status_codes = require('http-status-codes');
const {
   
    Category
} = require('../database/database');
module.exports = {

    async createCategory(req, res, next) {
        try {
            const {
                name
            } = req.body;           
            const category = await Category.create({
                name: name
            });
            return res.status(http_status_codes.CREATED).json(category);
        } catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Creating Category"
            });
        }
    },

    async updateCategory(req, res, next) {
        try {
            const {
                name
            } = req.body;
            categoryId = req.params.id;
            const category = await Category.update({
                name: name                
            }, {
                where: {
                    id: categoryId
                }
            });
            return res.status(http_status_codes.OK).json({
                message: 'Category Updated Successfully'
            });
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Updating Category"
            });
        }
    },

    async getCategory(req, res, next) {
        try {
            categoryId = req.params.id;
            const category = await Category.findOne({where: {id: categoryId }});
            return res.status(http_status_codes.OK).json(category);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching Category"
            });
        }
    },

    async getAllCategories(req, res, next) {
        try {            
            const category = await Category.findAll();
            return res.status(http_status_codes.OK).json(category);
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Fetching All Category"
            });
        }
    },


    async deleteCategory(req, res, next) {
        try {    
            categoryId = req.params.id;        
            const category = await Category.destroy({where: {id: categoryId}});
            return res.status(http_status_codes.OK).json({message: 'Category Deleted Successfully'});
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Category"
            });
        }
    }
};