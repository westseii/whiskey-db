const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const userProtected = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.userId;

      // token and id verified
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized. Invalid token");
    }
  }

  // TODO: redirect to /api/user/login if no token

  // no token, not verified
  if (!token) {
    res.status(401);
    throw new Error("Not authorized. Missing token");
  }
});

module.exports = { userProtected };
