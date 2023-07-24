const mongoose = require('mongoose');
const reviewObject = require('./reviewschema');


const gameObject = new mongoose.Schema({

    gameId: {type: Number, default: Math.floor((Math.random() * 10000))},
    name: {
        type: String,
    },
    gameCover: {
        type: String,
    },
    gameDescription: {
        type: String,
    },
    reviewStars: {
        type: Number
    },
    reviews: {
        type: Object
    }
    // reviews: reviewObject,
    
    // comment: {
    //     type: String,
    // }
})

module.exports = mongoose.model('game', gameObject);