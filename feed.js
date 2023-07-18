// feed file
const express = require('express');
const router = express.Router();
const Game = require('../models/games'); // accessing the games table in the 

mongoose.connect('mongodb+srv://TheBeast:WeLoveCOP4331@cluster0.z1q4jd5.mongodb.net/LargeProjectDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB'); // connecting to the database
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

app.post('/api/userfeed', async (req, res) => { // not sure if 'userfeed' is the right term but idk
    const { username, userID } = req.body; // changing to have req store userID
}