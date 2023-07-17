// user model
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
        unique: true
    },

    following: {
        type: [Number], // following will be an integer array used to store the userid's of the users this person is following
        default: []
    },

    rewiewIds: {
        type: Number,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: true,
        unique: true
    }

});