// user model
const mongoose = require('mongoose');
const reviewObject = require('./reviewschema');
// const gameObject = require('./gameschema');


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

    isConfirmed: {
        type: Boolean,
        default: false
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    verifyCode: {
        type: Number
    },

    UserID: {
        type: Number,
        default: Math.floor((Math.random() * 10000)),
        unique: true
    },

    profilePicture: {
        type: String,
        default: "/images/profilePicturePlaceHolder.png",
    },    
    name: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('user', userObject);
