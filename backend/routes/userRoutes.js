const express = require("express");
const router = express.Router();

// controllers
const { registerUser, authenticateUser, currentUser } = require("../controllers/userController");
const { userProtected } = require("../middleware/authMiddleware");

// routes
router.post("/register", registerUser);
router.post("/authenticate", authenticateUser);
router.get("/me", userProtected, currentUser);

module.exports = router;
