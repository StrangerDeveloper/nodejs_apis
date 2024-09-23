const mongoose = require('mongoose');

const dbSchema = mongoose.Schema({
    name: String,
    type: String,
    isFree: {
        type: Boolean,
        default: true
    },
    dailyWages: String,
    address: String, 
    phone: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    }, 
    userID: String
});

module.exports = mongoose.model('workers', dbSchema);