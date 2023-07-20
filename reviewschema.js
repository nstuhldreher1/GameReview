const mongoose = require('mongoose');

const reviewObject = new mongoose.Schema({

    userID: {
        type: Number,
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