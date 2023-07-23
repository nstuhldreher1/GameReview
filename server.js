const path = require('path');
const User = require('./usermodel');
const Review = require('./reviewschema');
const port = process.env.PORT || 3001;
const express = require('express');
const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const corsOptions = {
  orgin: '*',
  optionsSuccessStatus: 200, 
}

app.use(cors(corsOptions));

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
      const update = await User.findOneAndUpdate({username: username},{isConfirmed: true}, {new: true});
      console.log(update);
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

app.post('/api/userfeed', async (req, res) => { // not sure if 'userfeed' is the right term but idk
  const { username } = req.body; // changing to have req store userID
  const user = await User.findOne({username});

  console.log("line 192");
  if(user)
  {
    console.log("line 195");
    console.log(user.UserID);
    const documents = await Review.find({userID: user.UserID.valueOf()});

    if(documents) 
    {
      res.status(200).json(documents);
    }
    else {
      res.status(500).json({error: "review not found"});
    }
  }
  else 
  {
     res.status(500).json({error: "User not found"});
  }
})
app.post('/api/addreview', async (req, res) => {
  const { userID, reviewID, gameID, rating, comment } = req.body;


  // check if same reviewID is found
  const found = await Review.findOne({userID});
  // Create a new review document
  const newReview = new Review({ userID, reviewID,  gameID, rating, comment });
  // Save the new review to the database
  await newReview.save()
  .then(savedReview => {
    res.status(200).json(newReview);
  })
  .catch(err => {
    res.status(500).json({error: "an error has occured"});
  });


})

// delete review API
app.post('/api/deletereview', async (req, res) => {
  const { reviewID} = req.body;

  try {
    // Find the review based on reviewID
    const reviewToDelete = await Review.findOne({ reviewID: reviewID });

    if (reviewToDelete) {
      // Delete the review
      await reviewToDelete.deleteOne({reviewID: reviewID});
      return res.status(200).json({ message: 'Review deleted successfully!' });
    } else {
      return res.status(404).json({ message: 'Review not found.' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error.', error: err.message });
  }

})
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