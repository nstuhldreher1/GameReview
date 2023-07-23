const mongoose = require('mongoose');

const reviewObject = new mongoose.Schema({

    userID: {
        type: Number,
    },
    reviewID: {
        type: Number,
    },

    gameID: {
        type: Number,
    },
    
    rating: {
        type: Number,
    },
    comment: {
        type: String,
    }
})

module.exports = mongoose.model('review', reviewObject);