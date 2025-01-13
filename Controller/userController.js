const router = require("../Routes/userRoutes");
const { User } = require("../model/userModel.js");
// import { Note } from './models/notesModel'

const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
require('dotenv').config()

// create user
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Missing fields");
  } 

  try {
    const user = await User.create({
      username,
      email,
      password
    })
    console.log("user registered successfully");
    
    //jwt token
    const token = jwt.sign({ user }, process.env.mysecret, {
      expiresIn: '1h',
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie('token', token, {
      httpOnly : true,
      secure: true,
      sameSite : 'None'
    })
    res.status(200).json({ message: "Login successful", user: { email: user.email, username: user.username } });
   
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).send("Error adding user");
  }
};

//user login
const loginuser = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ error: "Username/Email and password are required" });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare plain-text passwords directly
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }


    //jwt token
    const token = jwt.sign({ user }, process.env.mysecret, {
      expiresIn: '1h',
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie('token', token, {
      httpOnly : true,
      secure: true,
      sameSite : 'None',

    })
    res.status(200).json({ message: "Login successful", user: { email: user.email, username: user.username } });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//user logout
const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: true, 
    sameSite: 'None',
    expires: new Date(0), 
  });
  res.status(200).json({ message: "Logged out successfully" });
};


module.exports = { createUser,loginuser, logoutUser };
