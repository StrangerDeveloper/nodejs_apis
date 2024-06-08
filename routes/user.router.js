const express = require('express');
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/registerUser', async (req, res) => {
    bcrypt.genSalt(12, async (err, salt) => {
        if (err) {
            res.status(500).json({ message: 'Error generating salt' });
            return;
        }
        // Hash the password using the generated salt
        const securePassword = await bcrypt.hash(req.body.password, salt);
        const data = userModel({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
            location_id: req.body.location_id,
            time_stamp: req.body.time_stamp ?? Date.now()
        });

        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

});

router.get("/getUsers", async (req, res) => {
    try {
        const data = await userModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/login', async (req, res) => {

    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            const validatedPass = await bcrypt.compare(req.body.password, user.password);
            if (validatedPass) {
                if (user.location_id == req.body.location_id) {
                    res.status(200).json({ success: true, message: "Successfully Logged in!", data: user });
                } else {
                    res.status(400).json({ success: false, message: "Location not found", data: {} });
                }
            } else {
                res.status(400).json({ success: false, message: "Password doesn't match!", data: {} });
            }
        } else {
            res.status(400).json({ success: false, message: "User not found!", data: {} });
        }
    } catch (error) {
        // Handle any other errors
        res.status(500).json({ success: false, message: "Internal server error", data: {} });
    }

});


router.get('/getUserById/:id', async (req, res) => {
    try {
        const data = await userModel.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;