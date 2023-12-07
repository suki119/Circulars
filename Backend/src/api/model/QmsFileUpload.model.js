const mongoose = require('mongoose');

const QmsFileUploadSchema = new mongoose.Schema({
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
    documentLevel: {
        type: String,
        required: true
    },
    subLevel: {
        type: String,
        required: true
    },
    qmsAccess: {
        type: String,
        required: true
    },
});

const fileUpload = mongoose.model('QmsFileUpload', QmsFileUploadSchema);

module.exports = fileUpload;