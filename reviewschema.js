const mongoose = require('mongoose');

const reviewObject = new mongoose.Schema({

    userID: {
        type: Number,
    },
    reviewID: {
        type: Number,
        unique: true
    },

    gameID: {
        type: Number,
    },
    
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    },
    activity: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
    }

})

module.exports = mongoose.model('review', reviewObject);