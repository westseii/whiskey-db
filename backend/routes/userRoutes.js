const express = require("express");
const router = express.Router();

// controllers
const { registerUser, loginUser, me } = require("../controllers/userController");
const { userProtected } = require("../middleware/authMiddleware");

// routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", userProtected, me);

module.exports = router;
