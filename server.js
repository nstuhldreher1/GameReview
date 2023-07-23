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

require('dotenv').config();
// Connect to MongoDB

mongoose.connect('mongodb+srv://TheBeast:WeLoveCOP4331@cluster0.z1q4jd5.mongodb.net/LargeProjectDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const {Redirect} = require('react-router-dom');
const { truncateSync } = require('fs');


//Server side routing to allow refresh
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'), function(err) {
    if (err) {
      return res.status(500).send(err)
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
        verifyCode: code // used for both email/forgot pass
    });
    console.log("line 61");

    // Save the user to the database
     await user.save();


    // Send email to confirm account creation using send grid
    // requires api key
    // const sgMail = require('@sendgrid/mail');
 
    // sgMail.setApiKey(process.env.SEND_GRID);

    // // one of my burner emails is being used (gonna have to put it in .env)
    // const message = {
    //   to: email,
    //   from: 'ryanskolano@gmail.com',
    //   subject: 'Game Review Email Verification',
    //   text: `Your email verification code is: ${code}`,
    // }

    // sgMail.send(message, function (err, info) {
    //   if (err) {
    //     console.log(err);
    //     //return res.status(400).json({error: err});
    //   } else { 
    //     console.log('Email Sent');
    //     console.log(info[0].statusCode);
    //     console.log(info[0].headers);
    //   }
    // });
    
    // if all goes well, return 200
    return res.status(200).json({error: ''});
    
  } catch (err) {
    console.error('Registration error', err);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// cant figure out how to change the user's isConfirmed to true 
// Verify route
app.post('/api/verify', async (req, res) => {

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

    // if the user is not confirmed
    if (user.isConfirmed === false) {
      const min = 100000;
      const max = 999999;
      const code = Math.floor((Math.random() * (max - min + 1))) + min;

      // update the existing user's verify code
      const update = await User.findOneAndUpdate({username: username}, {verifyCode: code}, {new: true});
      console.log("updated verifycode: " + update);

      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SEND_GRID);

      // one of my burner emails is being used (gonna have to put it in .env)
      const message = {
        to: user.email,
        from: 'ryanskolano@gmail.com',
        subject: 'Game Review Email Verification',
        text: `Your email verification code is: ${code}`,
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
        return res.status(200).json({error: '', isConfirmed: user.isConfirmed, email: user.email});

      } else {
        // Generate and return JWT token and isConfirmed
        const token = jwt.sign({ userId: user._id }, 'YOUR_SECRET_KEY');
        return res.json({ token: token, isConfirmed: user.isConfirmed, userID: user.UserID });
      }
      
    } catch (err) {
      console.error('Login error', err);
      return res.status(500).json({ error: 'An internal server error occurred' });
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
    console.log(documents);

    if(documents) 
    {
      return documents;
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
});

app.post('/api/addreview', async (req, res) => {
  const { userID, gameID, reviewID, rating, comment } = req.body;
  // check if same reviewID is found
  const found = await Review.findOne({reviewID});

  try {
    // Create a new review document
    const newReview = new Review({ reviewID, userID, gameID, rating, comment });

    // Save the review to the database
    await newReview.save();

    return res.status(201).json({ message: 'Review saved successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }

  if (found) 
  {
    const groupedReviews = await Review.aggregate([
      {
        $group: {
          _id: '$reviewID', // Group by reviewID
          reviews: { $push: '$$ROOT' }, // Collect all documents in an array called "reviews"
        },
      },
    ]);
    
  }

    
});

// request a password reset
app.post('/api/requestPassReset', async (req, res) => {
  const { email } = req.body;

  // find user in database and send otp email
  try {
    const existingUser = await User.findOne({ email });

    // if user does not exist
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // if the user exists, begin creating 4-digit otp email
    const min = 100000;
    const max = 999999;
    const otp = Math.floor((Math.random() * (max - min + 1))) + min;

    const update = await User.findOneAndUpdate({email: email}, {verifyCode: otp}, {new: true});


    const sgMail = require('@sendgrid/mail');

    sgMail.setApiKey(process.env.SEND_GRID);

    // one of my burner emails is being used (gonna have to put it in .env)
    const message = {
      to: email,
      from: 'ryanskolano@gmail.com',
      subject: 'Game Review Email Verification',
      text: `Your password recovery code is: ${otp}`,
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

    return res.status(200).json({error: ''});

  } catch (err) {
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// verify the otp
app.post('/api/verifyOtp', async (req, res) => {
  const { email, otp } = req.body;

  // search db for email and compare codes
  const existingUser = await User.findOne().or([{ email }]);
  if (existingUser) {
    if (otp === existingUser.verifyCode) {
      console.log('code verification success');
      return res.status(200).json({error: ''});
    } else {
      console.log('code verification fail');
      return res.status(400).json({error: 'Incorrect verification code'});
    }
  } else {
    return res.status(404).json({error: 'User not found'});
  }
});

// reset the password
app.post('/api/resetPassword', async (req, res) => {
  const { newPassword, email } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // find user by email and update!
  const update = await User.findOneAndUpdate({email: email}, {password: hashedPassword}, {new: true});
  if (update) {
    console.log('password successfully reset');
    return res.status(200).json({error: ''})
  } else {
    console.log('password reset failure');
    return res.status(404).json({error: 'User not found'});
  }
});


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