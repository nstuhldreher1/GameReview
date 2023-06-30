const mongoose = require('mongoose');
const userObject = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }


});