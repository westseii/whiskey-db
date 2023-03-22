const asyncHandler = require("express-async-handler");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const validate = require("../validate");

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

  // validate user password
  const passwordError = validate.password(password);
  if (passwordError) throw new Error(passwordError);

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
      // email: newUser.email,
      // firstName: newUser.firstName,
      // lastName: newUser.lastName,
      token: generateToken(newUser._id), // generate jwt
    });
  } else {
    res.status(400);
    throw new Error("User registration error. Try again");
  }
});

//
//
//
//
//
/**
 * @description Authenticate/login user
 * @route POST /api/user/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }); // username is unique, always

  res.set("Access-Control-Allow-Origin", process.env.FRONTEND_BASEURL);

  if (user && (await argon2.verify(user.password, password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      // email: user.email,
      // firstName: user.firstName,
      // lastName: user.lastName,
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
const me = asyncHandler(async (req, res) => {
  const { _id, username } = await User.findById(req.user); // from userProtected

  res.status(200).json({
    _id,
    username,
  });
});

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30m" });
};

module.exports = {
  registerUser,
  loginUser,
  me,
};
