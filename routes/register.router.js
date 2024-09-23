// const db = require("../config/config");
const bcrypt = require("bcryptjs");
// const uuid = require("uuid");


module.exports = async (req, res) => {
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
};
