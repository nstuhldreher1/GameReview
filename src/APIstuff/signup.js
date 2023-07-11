require('dotenv').config();
const  port = 3001;
const  express = require('express');
const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());

// require('dotenv').config();
// Connect to MongoDB
mongoose.connect('mongodb+srv://TheBeast:WeLoveCOP4331@cluster0.z1q4jd5.mongodb.net/LargeProjectDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// User model
const userSchema = new mongoose.Schema({
    UserID: {type: Number, default: Math.floor((Math.random() * 10000))},
    name: { type: String, required: true },
    email: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, default: false },
  });
  
const User = mongoose.model('User', userSchema);
// Middleware
app.use(express.json());

// Registration route
app.post('/signup', async (req, res) => {

const { name, email, username, password } = req.body;
  console.log(name, email, username, password);
  try {
    // Check if user with the same email or username already exists
    const existingUser = await User.findOne().or([{ username }]);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
        name,
        email,
        username,
        password: hashedPassword,
    });
    console.log("line 61");

    // Save the user to the database
    await user.save();

    // Send email to confirm account creation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'process.env.EMAIL',
        pass: 'process.env.EMAIL_PASSWORD',
      },
    });

    const mailOptions = {
      from: 'process.env.EMAIL',
      to: email,
      subject: 'Confirm Account Creation',
      text: 'Please confirm your account by clicking the following link: http://example.com/confirm',
    };
    console.log("line 80");
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email sending failed', error);
        return res.status(500).json({ error: 'An internal server error occurred' });
      }
      console.log('Email sent:', info.response);
      res.json({ message: 'Account created. Please check your email for confirmation instructions.' });

    });
  } catch (err) {
    console.error('Registration error', err);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});




app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});