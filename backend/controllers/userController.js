const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // TODO: replace with 'argon2id'

const User = require("../models/userModel");

/**
 * @description Register new user
 * @route POST /api/user/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;
  if (!(username && email && firstName && lastName && password)) {
    res.status(400);
    throw new Error("Register user is missing required fields");
  }

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error(`User with username (${username}) already exists`);
  }

  // password hashing
  // TODO: update with 'argon2id' functions
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);

  // create new user
  const newUser = await User.create({
    username,
    email,
    firstName,
    lastName,
    password: hashed,
  });
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      password: null,
    });
  } else {
    res.status(400);
    throw new Error("Register user error");
  }
});

/**
 * @description Authenticate user
 * @route POST /api/user/authenticate
 * @access Public
 */
const authenticateUser = asyncHandler(async (req, res) => {
  res.json({ message: "Authenticate user" });
});

/**
 * @description Get current user
 * @route GET /api/user/current
 * @access Public
 */
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Get current user" });
});

module.exports = {
  registerUser,
  authenticateUser,
  currentUser,
};
