// user model
const mongoose = require('mongoose');
const reviewObject = require('./reviewschema');
const gameObject = require('./gameschema');


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

    isVerified: {
        type: Boolean,
        default: false
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    UserID: {type: Number, default: Math.floor((Math.random() * 10000))},

    following: {
        type: [Number], // following will be an integer array used to store the userid's of the users this person is following
        default: []
    },
    reviews: reviewObject,
    
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

module.exports = mongoose.model('user', userObject);
