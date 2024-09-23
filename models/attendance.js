const mongoose = require("mongoose");

const dbSchema = mongoose.Schema(
{
    present: {
        type: Number,
        default: 0,
    },
    absent: {
        type: Number,
        default: 0,
    },
    daysOfWork: {
        type: Number,
        default: 0,
    },
    daysOfAbsence: {
        type: Number,
        default: 0,
    },
    contractId: {
        type: String,
        required: true,
    },
    workerId:{
        type: String,
        required: true,
    },

    userId: String,
    createdDate: {
        type: Date,
        default: Date.now,
    }, 

}
);

module.exports = mongoose.model("attendance", dbSchema);