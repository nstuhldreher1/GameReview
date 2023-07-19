const mongoose = require('mongoose');
const reviewObject = require('./reviewschema');


const gameObject = new mongoose.Schema({

    gameID: {
        type: Number,
        unique: true,

    },
    name: {
        type: String,
    },

    imageURL: {
        type: String,
    },
    reviews: reviewObject,
    
    comment: {
        type: String,
    }
})

module.exports = mongoose.model('game', gameObject);