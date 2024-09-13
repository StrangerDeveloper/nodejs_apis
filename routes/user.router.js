const express = require('express');
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/registerUser', async (req, res) => {
    bcrypt.genSalt(12, async (err, salt) => {
        if (err) {
            res.status(500).json({sucess: false, message: 'Error generating salt', data:{} });
            return;
        }
        // Hash the password using the generated salt
        const securePassword = await bcrypt.hash(req.body.password, salt);
        const data = userModel({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
            phone: req.body.phone,
            time_stamp: req.body.time_stamp ?? Date.now()
        });

        try {
            const dataToSave = await data.save();
            res.status(200).json({ sucess: true, message: "Users displaying", data: dataToSave });

        } catch (error) {
            res.status(400).json({sucess:false, message: error.message, data: {} });
        }
    });

});

router.get("/getUsers", async (req, res) => {
    try {

        const data = await userModel.find();
        res.json({ sucess: true, message: "Users displaying", data: data })
    }
    catch (error) {
        res.status(500).json({sucess: false, message: error.message, data:{} })
    }

});

router.get('/login', async (req, res) => {

    try {
        const user = await userModel.findOne({ phone: req.body.phone });
        if (user) {
            const validatedPass = await bcrypt.compare(req.body.password, user.password);
            if (validatedPass) {
                res.status(200).json({ sucess: true, message: "Successfully Logged in!", data: user });
                // if (user.email == req.body.email) {
                //     res.status(200).json({ success: true, message: "Successfully Logged in!", data: user });
                // } else {
                //     res.status(400).json({ success: false, message: "Location not found", data: {} });
                // }
            } else {
                res.status(400).json({ sucess: false, message: "Password doesn't match!", data: {} });
            }
        } else {
            res.status(400).json({ sucess: false, message: "User not found!", data: {} });
        }
    } catch (error) {
        // Handle any other errors
        res.status(500).json({ sucess: false, message: "Internal server error", data: {} });
    }

});


router.get('/getUserById/:id', async (req, res) => {
    try {
        const data = await userModel.findById(req.params.id);
        res.status(200).json({sucess:true, message: "successful",data:data})
    }
    catch (error) {
        res.status(500).json({ sucess:false, message: error.message, data:{} })
    }
})

router.post('/checkUser', async (req, res) => {
    try {

        const data = await userModel.findOne({ phone: req.body.phone });
        if (data) {
            res.status(200).json({ sucess: true, message: "user exists", data: data })
        } else {
            res.status(400).json({ sucess: false, message: "User not exists", data: {} })
        }
    }
    catch (error) {
        res.status(500).json({ sucess: false, message: error.message, data:{} })
    }
})

module.exports = router;