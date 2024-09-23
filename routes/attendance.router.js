const express = require("express");
const router = express.Router();

const attendance = require("./../models/attendance");

router.post("/postAttendance", (req, res) => {
    try {

        const dataToSave = attendance({
            present: req.body.present ?? 0,
            absent: req.body.absent ?? 0,
            daysOfWork: req.body.daysOfWork ?? 0,
            daysOfAbsence: req.body.daysOfAbsence ?? 0,
            contractId: req.body.contractId,
            workerId: req.body.workerId,
            userId: req.body.userId,
        }).save();

        res.status(201).json({ success: true, message: "posted", data: dataToSave });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message, data: {} });
    }

});



module.exports = router;