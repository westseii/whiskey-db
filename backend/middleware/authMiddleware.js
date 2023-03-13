const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const userProtected = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // get bearer token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("_id"); // found user id in database that matches token

      // token and id verified
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized. Invalid token");
    }
  }

  // no token, not verified
  if (!token) {
    res.status(401);
    throw new Error("Not authorized. Missing token");
  }
});

module.exports = { userProtected };
