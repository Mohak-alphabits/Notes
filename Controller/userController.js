const { User } = require("../model/userModel.js");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Create user
const createuser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const user = await User.create({
      username,
      email,
      password
    });
    console.log("User registered successfully");

    // JWT token
    const payload = {
      id: user.id,
      username: user.username
    };
    const token = jwt.sign(payload, process.env.mysecret, {
      expiresIn: '1h',
    });

    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie('token', token, {
      httpOnly: true,
    });
    res.status(200).json({ message: "User created successfully", user: { email: user.email, username: user.username } });

  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Error adding user" });
  }
};

// User login
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

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // JWT token
    const payload = {
      id: user.id,
      username: user.username
    };
    const token = jwt.sign(payload, process.env.mysecret, {
      expiresIn: '2h',
    });

    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie('token', token, {
      httpOnly: true
    });
    res.status(200).json({ message: "Login successful", user: { email: user.email, username: user.username } });

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};

// Update user details
const updateuser = async (req, res) => {
  const { userId, username, email, password } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password },
      { new: true }
    );
    console.log("User updated successfully");
    return res.status(200).json({ updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error while updating user" });
  }
};

// Delete user
const deleteuser = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("User deleted successfully");
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Server error while deleting user" });
  }
};

// User logout
const logoutuser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // Adjust based on environment
    sameSite: 'None',
    expires: new Date(0),  // Expire the cookie
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { createuser, loginuser, updateuser, logoutuser, deleteuser };
