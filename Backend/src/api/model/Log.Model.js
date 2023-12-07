const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    loggedIn: {
        type: String
    },
    loggedOut: {
        type: String
    }
});

const log = mongoose.model('Log', LogSchema);

module.exports = log;