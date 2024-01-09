const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    empName: {
        type: String,
        required: true
    },
    empNumber: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
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
    position: {
        type: String
    },
    passwordstatus: {
        type: String
    },
    circularsAccess: {
        type: String,
        required: true
    },
});

const user = mongoose.model('User', UserSchema);

module.exports = user;