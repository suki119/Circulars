const mongoose = require('mongoose');

const FileUploadSchema = new mongoose.Schema({
    eng_title: {
        type: String,
        required: true
    },
    sin_title: {
        type: String,
        // required: true
    },
    division: {
        type: String
    },
    keywords: {
        type: String
    },
    document:{
        type:String
    },
    date: {
        type: String
    },
   
});

const fileUpload = mongoose.model('FileUpload', FileUploadSchema);

module.exports = fileUpload;