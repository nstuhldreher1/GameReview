const mongoose = require('mongoose');

const reviewObject = new mongoose.Schema({

    reviewID: {
        type: Number,
        unique: true,

    },
    userID: {
        type: Number,
        unique: true,
    },

    gameID: {
        type: Number,
        unique: true,
    },
    rating: {
        type: Number,

    },
    comment: {
        type: String,
    }
})

module.exports = mongoose.model('review', reviewObject);