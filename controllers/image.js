const http_status_codes = require('http-status-codes');
const {
   
    
} = require('../database/database');
module.exports = {

   

    async uploadImage(req, res, next) {
        try {    
        
        } 
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Deleting Devotional"
            });
        }
    }
};