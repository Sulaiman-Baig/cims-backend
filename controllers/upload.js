const http_status_codes = require('http-status-codes');
const multer = require("multer");


const {


} = require('../database/database');
module.exports = {


    async uploadImage(req, res, next) {
        try {
            //  Multer Configuration Starts Here
            const MIME_TYPE_MAP = {
                "image/png": "png",
                "image/jpeg": "jpg",
                "image/jpg": "jpg"
            };

            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    const isValid = MIME_TYPE_MAP[file.mimetype];
                    let error = new Error("Invalid mime type");
                    if (isValid) {
                        error = null;
                    }
                    cb(error, "images");
                },
                filename: (req, file, cb) => {
                    const name = file.originalname
                        .toLowerCase()
                        .split(" ")
                        .join("-");
                    const ext = MIME_TYPE_MAP[file.mimetype];
                    cb(null, +Date.now() + "." + ext);
                }
            });
            //  Multer Configuration Finishes Here

            multer({
                storage: storage
            }).single("image"),
                (req, res, next) => {
                    const url = req.protocol + "://" + req.get("host");
                    const reqData = req.body;
                    console.log(reqData);
                    const imagePath = req.file.filename;

                    res.json(imagePath);
                }
        }
        catch (err) {
            return res.status(http_status_codes.INTERNAL_SERVER_ERROR).json({
                message: "Error Occurd in Uploding Image"
            });
        }
    }
};