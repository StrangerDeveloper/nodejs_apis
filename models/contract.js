const mongoose = require('mongoose');

const dbSchema = new mongoose.Schema({
    name: String,
    sqFeetPrice: String,
    location: String,
    startingDate: {
        type: Date,
        default: Date.now,
    },
    ownerId: String,
    contractUserId: String,
    workersId: [String], // Array of strings to hold worker IDs
});

module.exports = mongoose.model('contracts', dbSchema);
