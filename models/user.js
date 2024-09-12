const mongoose = require('mongoose');
 
const dbSchema = mongoose.Schema({
    name: String,
    phone: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    //store_location: String,
    //location_id: String,
    address: String,
    email: String,
   
    time_stamp: {
        type: Date,
        default: Date.now(),
    }

});

module.exports = mongoose.model('users', dbSchema);