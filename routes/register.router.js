const db = require("../config/config");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");


module.exports = async (req, res) => {
    const saltPassword = await bcrypt.genSalt(12);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);

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
};
