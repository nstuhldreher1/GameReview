const path = require('path');
const userModel = require('./usermodel');
const reviewModel = require('./reviewschema');
const port = process.env.PORT || 3001;
const express = require('express');
const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

// const userModel = require("./")

app.use(cors());
app.set('port', (process.env.PORT || 3001));

app.use(express.static(path.join(__dirname + "/frontend/build")));


// require('dotenv').config();
// Connect to MongoDB

mongoose.connect('mongodb+srv://TheBeast:WeLoveCOP4331@cluster0.z1q4jd5.mongodb.net/LargeProjectDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const {Redirect} = require('react-router-dom');


//Server side routing to allow refresh
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
  
// User model
<<<<<<< Updated upstream
const userSchema = new mongoose.Schema({
    UserID: {type: Number, default: Math.floor((Math.random() * 10000))},
    name: { type: String, required: true },
    email: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, default: false },
    verifyCode: {type: Number, required: true},
  });
=======
// const userSchema = new mongoose.Schema({
//     UserID: {type: Number, default: Math.floor((Math.random() * 10000))},
//     name: { type: String, required: true },
//     email: { type: String, required: true},
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     isConfirmed: { type: Boolean, default: false },
//   });

>>>>>>> Stashed changes
  
const User = new userModel();
const Review = new reviewModel();

// Middleware
app.use(express.json());

// Registration route
app.post('/api/signup', async (req, res) => {

  const { name, email, username, password } = req.body;
  try {
    // Check if user with the same email or username already exists
    const existingUser = await User.findOne().or([{ username }]);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the six digit verification code
    // the current idea is to store this in the users collection and when
    // the user enters the code on the frontend, that is sent to the api and 
    // the api grabs the code from the database using the username to query
    // and then compares the two
    const min = 100000;
    const max = 999999;
    const code = Math.floor((Math.random() * (max - min + 1))) + min;

    // Create a new user
    const user = new User({
        name,
        email,
        username,
        password: hashedPassword,
        verifyCode: code,
    });
    console.log("line 61");

    // Save the user to the database
     await user.save();


    // Send email to confirm account creation using send grid
    // requires api key
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID);

    // one of my burner emails is being used (gonna have to put it in .env)
    const message = {
      to: email,
      from: 'rkol2litkoya@gmail.com',
      subject: 'Game Review Email Verification',
      text: `Your verification code is: ${code}`,
    }

    sgMail
      .send(message)
      .then((response) => {
        console.log('Email Sent');
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      })
      .catch((error) => {
        return res.status(400).json({error: error});
      });

    // if all goes well, return 200
    return res.status(200).json({error: ''});
    
  } catch (err) {
    console.error('Registration error', err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// cant figure out how to change the user's isConfirmed to true 
// Verify route
app.post('/verify-api', async (req, res) => {

  const { username, code } = req.body;

  // search db for username and compare codes
  const existingUser = await User.findOne().or([{ username }]);
  if (existingUser) {
    console.log(existingUser);
    // if found, compare codes
    console.log(code);
    console.log(existingUser.verifyCode);
    if (code === existingUser.verifyCode) {
      console.log("yay");
      // if code matches, update their isConfirmed boolean to true
      console.log()
      User.updateOne({username: username}, {$set:{isConfirmed: true}}, { new: true });
      return res.status(200).json({error: ''});
    } else {
      return res.status(400).json({error: 'Incorrect verification code'});
    }
  } else {
    return res.status(404).json({error: 'User not found'});
  }
});


// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate and return JWT token
    const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY');
    res.json({ token });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

<<<<<<< Updated upstream
// check if user is confirmed
app.post('/api/check', async (req, res) => {
  const { username } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // return the isConfirmed attribute
    return res.status(200).json({error: '', isConfirmed: user.isConfirmed});

  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// added this to hopefully solve the cors issue
=======
app.post('/api/userfeed', async (req, res) => { // not sure if 'userfeed' is the right term but idk
  const { username } = req.body; // changing to have req store userID
  const user = await Review.findOne({username});
  if(user)
  {
    let userID = user.UserID;
    const reviews = await Review.findOne({userID});
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

>>>>>>> Stashed changes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});