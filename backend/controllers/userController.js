const asyncHandler = require("express-async-handler");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

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
    throw new Error("User registration is missing required fields");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error(`User with username (${username}) already exists`);
  }

  // password hashing
  const hashed = await argon2.hash(password);

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
      token: generateToken(newUser._id), // generate jwt
    });
  } else {
    res.status(400);
    throw new Error("User registration error");
  }
});

//
//
//
//
//
/**
 * @description Authenticate user
 * @route POST /api/user/authenticate
 * @access Public
 */
const authenticateUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }); // username is unique, always

  if (user && (await argon2.verify(user.password, password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateToken(user._id), // generate jwt
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
});

//
//
//
//
//
/**
 * @description Get current user credentials
 * @route GET /api/user/me
 * @access Private
 */
const currentUser = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id); // from userProtected middleware

  res.status(200).json({
    _id,
    username,
    email,
  });
});

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

module.exports = {
  registerUser,
  authenticateUser,
  currentUser,
};
