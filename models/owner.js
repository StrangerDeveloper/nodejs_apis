const mongoose = require('mongoose');

const dbSchema= mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    createdDate: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('owners', dbSchema);