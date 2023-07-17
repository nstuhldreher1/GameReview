const mongoose = require('mongoose');

const reviewObject = new mongoose.Schema({ // reference as const User = require('./usermodel'); in main files I think.
    starRating: {
        type: Number,
        required: true
    },
    commentString: {
        type: String,
        required: true
    },
    reviewID: {
        type: Number, // randomly generated unique ID number which will also be saved to a user object to organize which reviews correspond to which user
        unique: true,
        required: true
    }
});