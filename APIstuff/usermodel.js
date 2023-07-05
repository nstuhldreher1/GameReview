const mongoose = require('mongoose');

const userObject = new mongoose.Schema({ // reference as const User = require('./usermodel'); in main files I think.
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: true
    },

    isverified: {
        type: Boolean,
        default: false
    },

    email: {
        type: String,
        required: true,
        unique: true 
    },

    userID: {
        type: String,
        requried: true,
        unique:true
    }
});
