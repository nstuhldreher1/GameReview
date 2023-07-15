// gameobject
const mongoose = require('mongoose');

const gameObject = new mongoose.Schema({
    name: {
        type: String, // stores the name of the game
        required: true
    },
    reviewStars: {
        type: Number, // storing the average review score of the game
        default: 0 // thinking of having it get calculated and updated with every new review posting? (inefficient but effective)
    },
    gameCover: {
        type: String, // This will store the file location path
        required: true
    },
    gameId: {
        type: Number, // this will store the randomly generated game ID to ensure reviews are properly attributed to the game object
        required: true
    }
});

const Game = mongoose.model('Game', gameObject);

module.exports = Game;