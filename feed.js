// feed file
const userModel = require('./usermodel');
const reviewModel = require('./reviewschema');
const express = require('express');
// const router = express.Router();
// const Game = require('../models/games'); // accessing the games table in the 
const app = express();
const cors = require('cors');

app.use(cors());
app.set('port', (process.env.PORT || 3001));

mongoose.connect('mongodb+srv://TheBeast:WeLoveCOP4331@cluster0.z1q4jd5.mongodb.net/LargeProjectDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB'); // connecting to the database
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

app.use(express.json());


app.post('/api/userfeed', async (req, res) => { // not sure if 'userfeed' is the right term but idk
    const { username } = req.body; // changing to have req store userID
    const user = await userModel.findOne({username});
    if(user)
    {
      let userID = user.UserID;
      const reviews = await reviewModel.findOne({userID});
      if(reviews) 
      {
        return reviews;
      }
      else {
        return 'no reviews found ';
      }
    }
    else 
    {
        console.log("User not found");
        return null;
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });